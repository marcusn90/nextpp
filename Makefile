build:
	deno run --importmap=./import_map.json --allow-net --allow-read --allow-write --unstable ./index.ts

deno_reload_build_cache:
	deno cache --reload --importmap=import_map.json --unstable ./index.ts

serve:
	deno run --importmap=./import_map.json --allow-net --allow-read --unstable --watch ./src/webserver/index.ts