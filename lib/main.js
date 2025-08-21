// @ts-check

/**
 * @param {Object} options
 * @param {string} options.prompt
 * @param {string} options.model
 * @param {string} options.apiKey
 * @param {import("ai")} options.ai
 * @param {import("@actions/core")} options.core
 */
export async function main({ prompt, model, apiKey, ai, core }) {
  process.env.AI_GATEWAY_API_KEY = apiKey;

  const { text, response } = await ai.generateText({ prompt, model });

  core.setOutput("text", text);
}