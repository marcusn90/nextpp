import * as Log from "https://deno.land/std/log/mod.ts";

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

export { Log };
