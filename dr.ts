// --allow-read --allow-write
import outdent from "http://deno.land/x/outdent@v0.8.0/mod.ts";
import { readLine } from "./utils/io.ts";

for await (const { name } of Deno.readDir(".")) {
  if (!name.endsWith(".ts")) continue;
  const lines = readLine(await Deno.open(name, { read: true }));

  let permissions = "";
  for await (const line of lines) {
    if (line.startsWith("//") && line.includes("--allow")) {
      permissions = line.replace("//", "").trim();
    }
    break;
  }

  await Deno.writeTextFile(
    `.run/${name.replace(".ts", "")}`,
    outdent`
      #!/usr/bin/env bash
      deno run ${permissions} ${name} $@
    `
  );
}
