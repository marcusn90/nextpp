build:
	deno run --importmap=./import_map.json --allow-net --allow-read --allow-write --unstable ./index.ts