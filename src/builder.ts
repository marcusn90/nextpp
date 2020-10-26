import { ensureFileSync, existsSync } from "https://deno.land/std/fs/mod.ts";
import { Log } from "nextpp/deps/utils.ts";
import { build_page } from "nextpp/page_builder.jsx";
import { IConfig, IConfigRouteEntry } from "nextpp/interfaces.ts";
import { assert } from "https://deno.land/std@0.74.0/_util/assert.ts";

//setup to make Log.debug output smthng
await Log.setup({
  handlers: {
    console: new Log.handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    // configure default Logger available via short-hand methods above
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },
  },
});

function list_dir_files(path: string) {
  const list = [];
  for (const entry of Deno.readDirSync(path)) {
    if (entry.isFile) list.push(`${path}${entry.name}`);
  }
  return list;
}

async function process_route_entry(
  src_files_list: Array<string>,
  output_dir: string,
  route_cfg: IConfigRouteEntry,
) {
  const prepared = await route_cfg.prepare();
  console.log(src_files_list);
  for (const _src_file of src_files_list) {
    let Root: any; // TODO: find Module typedef or something

    // hack
    // in route.config.js all paths should be specified relatively to project root
    // starting with ./
    // for import we need /, see rule in import_map.json
    const src_file = _src_file.replace(/^\.\//, "/");

    try {
      Root = await import(src_file);
    } catch (e) {
      Log.error(`Failed to import ${src_file} -> ${e.message}`);
      continue;
    }

    const files_to_generate = [].concat(
      route_cfg.resolve_uri(src_file, prepared),
    );
    files_to_generate.forEach((page_file_name) => {
      const file = `${output_dir}/${page_file_name}.html`;
      ensureFileSync(file);
      Deno.writeTextFileSync(
        file,
        build_page(Root.default),
      );
      Log.debug(`- Created ${file}`);
    });
  }
}

function validate_config(config: IConfig) {
  assert(
    config.output_dir.startsWith("./"),
    "Invalid route.config: 'output_dir' should start with './'",
  );
  assert(config.routes?.length > 0, "Invalid route.config: no routes defined");
  for (const r of config.routes) {
    assert(
      r.path?.startsWith("./"),
      "Invalid route.config: 'route.path' should start with './'",
    );
  }
}

export async function build_from_config(config: IConfig) {
  validate_config(config);
  const { output_dir } = config;
  try {
    await Deno.remove(output_dir, { recursive: true });
    Log.info(`Remove output dir: ${output_dir} removed.`);
  } catch (e) {
    Log.info(`Remove output dir: not found`);
  }

  await Deno.mkdir(output_dir, { recursive: true });
  Log.info(`Create output dir: ${output_dir} created.`);
  for (const r of config.routes) {
    const fs_path = r.path;
    Log.info(`Build routes for ${fs_path}:`);
    if (!existsSync(fs_path)) {
      Log.warning("Path not found. Continue");
      continue;
    }
    const stat = Deno.statSync(fs_path);
    let files: Array<string>;
    if (stat.isDirectory) {
      files = list_dir_files(fs_path);
    } else {
      files = [fs_path];
    }
    await process_route_entry(files, output_dir, r);
  }
  Log.info("Done");
}
