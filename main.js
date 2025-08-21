// @ts-check

import core from "@actions/core";
import * as ai from "ai";

import { main } from "./lib/main.js";

const prompt = core.getInput("prompt");
const model = core.getInput("model");
const apiKey = core.getInput("api-key");

// Export promise for testing
export default main({ prompt, model, apiKey, ai, core }).catch((error) => {
  /* c8 ignore next 3 */
  console.error(error);
  core.setFailed(error.message);
});
