import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts";
import {
  join,
  fromFileUrl,
  dirname,
} from "https://deno.land/std@0.182.0/path/mod.ts";

export const loadEnv = () =>
  load({
    envPath: join(dirname(fromFileUrl(import.meta.url)), "..", ".env"),
  });
