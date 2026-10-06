// @ts-check

/**
 * @param {Object} options
 * @param {string} options.prompt
 * @param {string} options.model
 * @param {string} options.apiKey
 * @param {string} options.schema
 * @param {string} options.system
 * @param {typeof import("ai")} options.ai
 * @param {typeof import("@actions/core")} options.core
 */
export async function main({ prompt, model, apiKey, schema, system, ai, core }) {
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

    // Use structured output when schema is provided
    /** @type {Parameters<typeof ai.generateText>[0]} */
    const options = { 
      prompt, 
      model, 
      output: ai.Output.object({ schema: aiSchema })
    };
    
    // Add system message if provided
    if (system && system.trim()) {
      options.instructions = system;
    }
    
    const { output } = await ai.generateText(options);

    core.setOutput("json", JSON.stringify(output));
    // Also set text output to the JSON string for backward compatibility
    core.setOutput("text", JSON.stringify(output));
  } else {
    // Use generateText when no schema is provided (existing behavior)
    /** @type {Parameters<typeof ai.generateText>[0]} */
    const options = { prompt, model };
    
    // Add system message if provided
    if (system && system.trim()) {
      options.instructions = system;
    }
    
    const { text } = await ai.generateText(options);

    core.setOutput("text", text);
  }
}
