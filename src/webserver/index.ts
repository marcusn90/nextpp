import { serve } from "nextpp/deps/http.ts";
import { Log } from "nextpp/deps/utils.ts";

import route_config from "/routes.config.js";

const { debug, info, error } = Log;

debug(Deno.cwd());
const generated_urls = JSON.parse(
  Deno.readTextFileSync("./static/generated_urls.json"),
);

debug(generated_urls);

const hostname = "0.0.0.0";
const port = 8080;
const server = serve({ hostname, port });

info(`Server on ${hostname}:${port}`);

for await (const req of server) {
  debug(req.method);
  debug(req.url);
  debug(req.headers);

  try {
    let filename = `./${route_config.output_dir}${req.url}`;
    if (route_config.index_page && req.url === "/") {
      filename += `${route_config.index_page}.html`;
    } else if (generated_urls.includes(req.url)) {
      filename += ".html";
    }
    const body = Deno.readTextFileSync(filename);
    req.respond(
      { status: 200, body },
    );
  } catch (err) {
    error(err);
    if (err instanceof Deno.errors.NotFound) {
      req.respond({ status: 400, body: "Page not found." });
    } else {
      req.respond({ status: 500 });
    }
  }
}
