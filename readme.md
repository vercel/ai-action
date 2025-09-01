# AI Action

[![test](https://github.com/vercel/ai-action/actions/workflows/test.yml/badge.svg)](https://github.com/vercel/ai-action/actions/workflows/test.yml)

GitHub Action to interact with different AI model providers.

## Usage

In order to use this action, you need to 

1. [create an API KEY for the AI Gateway](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys)
2. [pick one of the supported models](https://vercel.com/ai-gateway/models)


### Basic Text Generation

```yaml
name: Basic text generation example
on:
  push:
    branches:
      - main

jobs:
  generate-text:
    runs-on: ubuntu-latest
    steps:
      - uses: vercel/ai-action@v2
        id: prompt
        with:
          prompt: 'Why is the sky blue?'
          model: 'openai/gpt5'
          api-key: ${{ secrets.AI_GATEWAY_API_KEY }}
      - run: echo ${{ steps.prompt.outputs.text }}
```

### Structured JSON Generation

When you provide a JSON schema, the action will generate structured data that conforms to your schema:

```yaml
name: Structured data generation example
on:
  push:
    branches:
      - main

jobs:
  generate-recipe:
    runs-on: ubuntu-latest
    steps:
      - uses: vercel/ai-action@v2
        id: recipe
        with:
          prompt: 'Generate a lasagna recipe'
          schema: |
            {
              "$schema": "https://json-schema.org/draft/2020-12/schema",
              "type": "object",
              "properties": {
                "recipe": {
                  "type": "object",
                  "properties": {
                    "name": {"type": "string"},
                    "ingredients": {
                      "type": "array",
                      "items": {"type": "string"}
                    },
                    "steps": {
                      "type": "array",
                      "items": {"type": "string"}
                    }
                  },
                  "required": ["name", "ingredients", "steps"],
                  "additionalProperties": false
                }
              },
              "required": ["recipe"],
              "additionalProperties": false
            }
          model: 'openai/gpt-4.1'
          api-key: ${{ secrets.AI_GATEWAY_API_KEY }}
      - name: Use structured output
        run: |
          echo "Generated recipe JSON:"
          echo '${{ steps.recipe.outputs.json }}'
          
          # Parse and use specific fields
          echo "Recipe name: $(echo '${{ steps.recipe.outputs.json }}' | jq -r '.recipe.name')"
```

## Inputs

### `prompt`

**Required.** The input prompt to generate the text from.

### `api-key`

**Required.** [An API KEY for the AI Gateway](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys).

### `model`

**Required.** An identifier from the list of provider models supported by the AI Gateway: https://vercel.com/ai-gateway/models

### `schema`

**Optional.** A valid JSON Schema for structured output generation. When provided, the action will use `generateObject` to generate structured JSON data that conforms to the schema. The schema should be a valid JSON Schema (draft 2020-12 or compatible).

## Outputs

### `text`

The generated text by the model. When using structured generation with a schema, this contains the JSON string.

### `json`

The generated JSON object when using structured generation with a schema. This output is only available when the `schema` input is provided.

## How it works

The action is utilizing the [AI SDK](https://ai-sdk.dev/) to send requests to the [AI Gateway](https://vercel.com/ai-gateway).

- **Text Generation**: Uses the `generateText` function for basic text generation
- **Structured Generation**: Uses the `generateObject` function when a JSON schema is provided, ensuring the output conforms to your specified structure

## Contributing

[contributing.md](contributing.md)

## License

[MIT](license.md)
