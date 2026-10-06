import { AI_SDK_HEADERS, DEFAULT_ENV, test } from "./main.js";

// Verify that main works with system message for text generation
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
              role: "system",
              content: "You are a kindergarten teacher getting questions by 5 year old students",
            },
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
              text: "The sky is blue because of something called Rayleigh scattering! Imagine tiny air molecules in the sky that act like little prisms. When sunlight comes through, it has all the colors of the rainbow mixed together. The blue light bounces around the most, so we see more blue in the sky!"
            }
          ],
          finishReason: { unified: "stop", raw: "stop" },
          usage: {
            inputTokens: { total: 25, noCache: 25, cacheRead: 0, cacheWrite: 0 },
            outputTokens: { total: 55, text: 55, reasoning: 0 },
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
    INPUT_SYSTEM: "You are a kindergarten teacher getting questions by 5 year old students"
  }
);
