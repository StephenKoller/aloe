import { readFile } from "./lib/file.ts";

// parse console args
if(Deno.args.length >= 1) {
  const arg1 = Deno.args[0];

  const htmlFile = await readFile(arg1);

  try {
    await Deno.mkdir('./dest');
  } catch () {
    // no-op, swallow error if directory already exists
  }

  await Deno.writeTextFile('./dest/index.html', htmlFile);
}
