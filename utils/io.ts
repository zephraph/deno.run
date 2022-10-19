import { iterateReader } from "https://deno.land/std@0.157.0/streams/conversion.ts?s=iterateReader";

const newLine = 0xa;
export async function* readLine(
  read: Deno.Reader
): AsyncIterableIterator<string> {
  let buf = new Uint8Array(0);
  for await (const chunk of iterateReader(read)) {
    buf = new Uint8Array([...buf, ...chunk]);
    let index = buf.indexOf(newLine);
    while (index !== -1) {
      const line = new TextDecoder().decode(buf.slice(0, index));
      buf = buf.slice(index + 1);
      index = buf.indexOf(newLine);
      yield line;
    }
  }
  yield new TextDecoder().decode(buf).trim();
}

export const pipeInput = readLine(Deno.stdin);
