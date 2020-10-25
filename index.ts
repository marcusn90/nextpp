import { build_page } from "./src/page_builder.jsx";

import cfg from "./sandbox/route.config.js";

for (const r of cfg.routes) {
  console.log("Import from: ", r.file);
  const Root = await import(r.file);
  const page_file_name = `./static/${r.uri}.html`;
  Deno.writeTextFile(page_file_name, build_page(Root.default));
  console.log("Write to: ", page_file_name);
}

console.log('Done');

