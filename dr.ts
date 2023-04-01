// --allow-read --allow-write --allow-run
import outdent from "http://deno.land/x/outdent@v0.8.0/mod.ts";
import { readLine } from "./utils/io.ts";

for await (const { name } of Deno.readDir(".")) {
  if (!name.endsWith(".ts") && !name.endsWith(".tsx")) continue;
  const lines = readLine(await Deno.open(name, { read: true }));

  let permissions = "";
  for await (const line of lines) {
    if (line.startsWith("//") && line.includes("--allow")) {
      permissions = line.replace("//", "").trim();
    }
    break;
  }

  const script = name.replace(/\.tsx?/, "");
  await Deno.writeTextFile(
    `.run/${script}`,
    outdent`
      #!/usr/bin/env bash
      DIR=$(cd "$(dirname "\${BASH_SOURCE[0]}")" &> /dev/null && pwd)
      deno run ${permissions} $DIR/../${name} $@
    `
  );
  if (Deno.build.os !== "windows") {
    Deno.run({
      cmd: ["chmod", "+x", `.run/${script}`],
    });
  }
}
