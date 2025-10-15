import { DEFAULT_ENV, test } from "./main.js";

// Verify that main works with system message for structured JSON generation
await test(
  (mockPool) => {
    mockPool
      .intercept({
        path: `/v1/ai/language-model`,
        method: "POST",
        body: JSON.stringify({
          responseFormat: {
            type: "json",
            schema: {
              "$schema": "https://json-schema.org/draft/2020-12/schema",
              type: "object",
              properties: {
                recipe: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    ingredients: {
                      type: "array",
                      items: { type: "string" }
                    },
                    steps: {
                      type: "array", 
                      items: { type: "string" }
                    }
                  },
                  required: ["name", "ingredients", "steps"],
                  additionalProperties:false
                }
              },
              required: ["recipe"],
              additionalProperties: false
            }
          },
          prompt: [
            {
              role: "system",
              content: "You are a helpful recipe assistant",
            },
            {
              role: "user",
              content: [{ type: "text", text: "Generate a simple pasta recipe" }],
            },
          ]
        }),
      })
      .reply(
        200,
        {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                recipe: {
                  name: "Simple Pasta",
                  ingredients: [
                    "1 lb pasta",
                    "2 tbsp olive oil",
                    "3 cloves garlic, minced",
                    "Salt and pepper to taste",
                    "Fresh basil"
                  ],
                  steps: [
                    "Boil water and cook pasta according to package directions",
                    "Heat olive oil in a pan and sauté garlic",
                    "Drain pasta and toss with garlic oil",
                    "Season with salt and pepper",
                    "Garnish with fresh basil"
                  ]
                }
              })
            }
          ],
          finishReason: "stop",
          usage: {
            inputTokens: 35,
            outputTokens: 100,
            totalTokens: 135
          }
        },
        { headers: { "content-type": "application/json" } }
      );
  },
  {
    ...DEFAULT_ENV,
    INPUT_PROMPT: "Generate a simple pasta recipe",
    INPUT_MODEL: "openai/gpt-4.1",
    "INPUT_API-KEY": "vck_12345",
    INPUT_SYSTEM: "You are a helpful recipe assistant",
    INPUT_SCHEMA: JSON.stringify({
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        recipe: {
          type: "object",
          properties: {
            name: { type: "string" },
            ingredients: {
              type: "array",
              items: { type: "string" }
            },
            steps: {
              type: "array", 
              items: { type: "string" }
            }
          },
          required: ["name", "ingredients", "steps"],
          additionalProperties: false
        }
      },
      required: ["recipe"],
      additionalProperties: false
    })
  }
);
