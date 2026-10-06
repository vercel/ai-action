import { AI_SDK_HEADERS, DEFAULT_ENV, test } from "./main.js";

// Verify that main works with empty schema (treats as no schema)
await test(
  (mockPool) => {
    mockPool
      .intercept({
        path: `/v4/ai/language-model`,
        method: "POST",
        body: JSON.stringify({
          toolChoice: { type: "auto" },
          prompt: [
            {
              role: "user",
              content: [{ type: "text", text: "Why is the sky blue?" }],
            },
          ],
          headers: AI_SDK_HEADERS,
        }),
      })
      .reply(
        200,
        {
          content: [
            {
              type: "text",
              text: "The sky appears blue due to Rayleigh scattering of sunlight by molecules in Earth's atmosphere."
            }
          ],
          finishReason: { unified: "stop", raw: "stop" },
          usage: {
            inputTokens: { total: 12, noCache: 12, cacheRead: 0, cacheWrite: 0 },
            outputTokens: { total: 20, text: 20, reasoning: 0 },
          }
        },
        { headers: { "content-type": "application/json" } }
      );
  },
  {
    ...DEFAULT_ENV,
    INPUT_PROMPT: "Why is the sky blue?",
    INPUT_MODEL: "openai/gpt5",
    "INPUT_API-KEY": "vck_12345",
    INPUT_SCHEMA: "   " // Empty/whitespace-only schema should be treated as no schema
  }
);
