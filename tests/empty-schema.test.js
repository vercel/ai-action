import { DEFAULT_ENV, test } from "./main.js";

// Verify that main works with empty schema (treats as no schema)
await test(
  (mockPool) => {
    mockPool
      .intercept({
        path: `/v1/ai/language-model`,
        method: "POST",
        body: JSON.stringify({
          prompt: [
            {
              role: "user",
              content: [{ type: "text", text: "Why is the sky blue?" }],
            },
          ],
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
          finishReason: "stop",
          usage: {
            inputTokens: 12,
            outputTokens: 20,
            totalTokens: 32
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
