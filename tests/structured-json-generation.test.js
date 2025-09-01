import { DEFAULT_ENV, test } from "./main.js";

// Verify that main works with schema input and returns JSON output
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
                  additionalProperties: false
                }
              },
              required: ["recipe"],
              additionalProperties: false
            }
          },
          prompt: [
            {
              role: "user",
              content: [{ type: "text", text: "Generate a lasagna recipe" }],
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
                  name: "Classic Lasagna",
                  ingredients: [
                    "1 lb ground beef",
                    "1 onion, diced",
                    "3 cloves garlic, minced",
                    "2 cups marinara sauce",
                    "1 lb lasagna noodles",
                    "15 oz ricotta cheese",
                    "2 cups shredded mozzarella",
                    "1/2 cup parmesan cheese",
                    "2 eggs",
                    "Salt and pepper to taste"
                  ],
                  steps: [
                    "Preheat oven to 375°F",
                    "Cook lasagna noodles according to package directions",
                    "Brown ground beef with onion and garlic",
                    "Mix ricotta, eggs, and seasonings",
                    "Layer sauce, noodles, meat, cheese mixture",
                    "Repeat layers, top with mozzarella and parmesan",
                    "Bake for 45 minutes until bubbly and golden"
                  ]
                }
              })
            }
          ],
          finishReason: "stop",
          usage: {
            inputTokens: 45,
            outputTokens: 150,
            totalTokens: 195
          }
        },
        { headers: { "content-type": "application/json" } }
      );
  },
  {
    ...DEFAULT_ENV,
    INPUT_PROMPT: "Generate a lasagna recipe",
    INPUT_MODEL: "openai/gpt-4.1",
    "INPUT_API-KEY": "vck_12345",
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
