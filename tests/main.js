// Base for all `main` tests.
// @ts-check
import { MockAgent, setGlobalDispatcher } from "undici";
import assert from "node:assert/strict";
import aiPackage from "ai/package.json" with { type: "json" };

export const AI_SDK_HEADERS = { "user-agent": `ai/${aiPackage.version}` };

export const DEFAULT_ENV = {
  GITHUB_REPOSITORY_OWNER: "gr2m",
  GITHUB_REPOSITORY: "vercel/ai-action",
};

export async function test(cb = (_mockPool) => {}, env = DEFAULT_ENV) {
  for (const [key, value] of Object.entries(env)) {
    process.env[key] = value;
  }

  if (process.env.AI_GATEWAY_API_KEY) {
    process.env["INPUT_API-KEY"] = process.env.AI_GATEWAY_API_KEY;
  }

  // Set up mocking
  const mockAgent = new MockAgent({ enableCallHistory: true });
  mockAgent.disableNetConnect();
  setGlobalDispatcher(mockAgent);
  const mockPool = mockAgent.get("https://ai-gateway.vercel.sh");

  // Run the callback
  cb(mockPool);

  // Run the main script
  const { default: entrypoint } = await import(
    process.env.AI_ACTION_TEST_BUNDLE ? "../dist/main.cjs" : "../main.js"
  );
  await (entrypoint.default ?? entrypoint);

  console.log("--- REQUESTS ---");
  const calls = mockAgent
    .getCallHistory()
    .calls()
    .map((call) => {
      assert(
        call.headers.authorization === `Bearer ${process.env["INPUT_API-KEY"]}`,
        "Gateway authorization must match the action's api-key input"
      );
      const route = `${call.method} ${call.path}`;
      if (call.method === "GET") return route;

      return `${route}\n${call.body}`;
    });

  console.log(calls.join("\n"));
}
