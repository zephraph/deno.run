import { pipeInput } from "./utils/io.ts";

const script = Deno.args.join(" ");

for await (const line of pipeInput) {
  if (!line) break;

  let ret;
  if (script.startsWith(".")) {
    ret = eval(`"${line}"${script}`);
  } else {
    const f = eval(script || "x => x");
    ret = f(line);
  }
  if (ret === true) {
    console.log(line);
  } else if (ret) {
    console.log(ret);
  }
}
