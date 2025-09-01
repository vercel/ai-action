// @ts-check

/**
 * @param {Object} options
 * @param {string} options.prompt
 * @param {string} options.model
 * @param {string} options.apiKey
 * @param {string} options.schema
 * @param {import("ai")} options.ai
 * @param {import("@actions/core")} options.core
 */
export async function main({ prompt, model, apiKey, schema, ai, core }) {
  process.env.AI_GATEWAY_API_KEY = apiKey;

  if (schema && schema.trim()) {
    // Parse the schema string to a JSON object
    let parsedSchema;
    try {
      parsedSchema = JSON.parse(schema);
    /* c8 ignore next 3 */
    } catch (error) {
      throw new Error(`Invalid JSON schema: ${error.message}`);
    }

    // Convert JSON schema to AI SDK schema format
    const aiSchema = ai.jsonSchema(parsedSchema);

    // Use generateObject when schema is provided
    const { object, response } = await ai.generateObject({ 
      prompt, 
      model, 
      schema: aiSchema 
    });

    core.setOutput("json", JSON.stringify(object));
    // Also set text output to the JSON string for backward compatibility
    core.setOutput("text", JSON.stringify(object));
  } else {
    // Use generateText when no schema is provided (existing behavior)
    const { text, response } = await ai.generateText({ prompt, model });

    core.setOutput("text", text);
  }
}