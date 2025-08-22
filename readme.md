# AI Action

[![test](https://github.com/vercel/ai-action/actions/workflows/test.yml/badge.svg)](https://github.com/vercel/ai-action/actions/workflows/test.yml)

GitHub Action to interact with different AI model providers.

## Usage

In order to use this action, you need to 

1. [create an API KEY for the AI Gateway](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys)
2. [pick one of the supported models](https://vercel.com/ai-gateway/models)


```yaml
name: Minimal usage example
on:
  push:
    branches:
      - main

jobs:
  generate-text:
    runs-on: ubuntu-latest
    steps:
      - uses: vercel/ai-action@v1
        id: prompt
        with:
          prompt: 'Why is the sky blue?'
          model: 'openai/gpt5'
          api-key: ${{ secrets.AI_GATEWAY_API_KEY }}
      - run: echo ${{ steps.prompt.outputs.text }}
```

## Inputs

### `prompt`

The input prompt to generate the text from

### `api-key`

[An API KEY for the AI Gateway](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys)

### `model`

An identifier from the list of provider models supported by the AI Gateway:
https://vercel.com/ai-gateway/models

**Optional:** The URL of the GitHub REST API. Defaults to the URL of the GitHub Rest API where the workflow is run from.

## Outputs

### `text`

The generated text by the model

## How it works

The action is utilizing the [AI SDK](https://ai-sdk.dev/) to send requests to the [AI Gateway](https://vercel.com/ai-gateway).

## Contributing

[contributing.md](contributing.md)

## License

[MIT](license.md)
