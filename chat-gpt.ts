// --allow-env --allow-read --allow-net
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "npm:openai";
import { pipeInput } from "./utils/io.ts";
import { loadEnv } from "./utils/env.ts";

const env = await loadEnv();

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const message = {
  role: "system",
  content: "",
} satisfies ChatCompletionRequestMessage;

const lines = [];

for await (const line of pipeInput) {
  lines.push(line);
}
message.content = lines.join("\n");

const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content:
        "You are a personal AI assistant. Your responses should be in markdown format.",
    },
    message,
  ],
});

console.log(response.data.choices[0].message?.content);
