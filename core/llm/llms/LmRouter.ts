import { LLMOptions } from "../../index.js";
import { osModelsEditPrompt } from "../templates/edit.js";

import OpenAI from "./OpenAI.js";

// Get Continue version from package.json at build time
const CONTINUE_VERSION = process.env.npm_package_version || "unknown";

/**
 * LM Router LLM Provider
 *
 * LM Router is a smart OpenAI-compatible router for LM Studio that provides:
 * - Automatic model selection based on request type and capabilities
 * - Vision bridge for non-vision models
 * - Session pinning and routing rules
 *
 * Features:
 * - Virtual models: router/auto, router/code, router/reasoning, router/vision, router/fast, router/long_context
 * - Automatic routing to best model based on prompt characteristics
 * - Vision support bridge for code models
 * - Session-based conversation management
 *
 * @see https://github.com/continuedev/lm-router
 */
class LmRouter extends OpenAI {
  static providerName = "lmrouter";

  // LmRouter can route to models that support various features
  protected supportsReasoningField = true;
  protected supportsReasoningDetailsField = true;

  static defaultOptions: Partial<LLMOptions> = {
    apiBase: "http://localhost:4000/v1/",
    model: "router/auto",
    promptTemplates: {
      edit: osModelsEditPrompt,
    },
    useLegacyCompletionsEndpoint: false,
  };

  /**
   * Override headers to include Continue-specific User-Agent
   * This helps LM Router track integration usage and optimize accordingly
   */
  protected _getHeaders() {
    return {
      ...super._getHeaders(),
      "User-Agent": `Continue/${CONTINUE_VERSION}`,
      "X-Continue-Provider": "lmrouter",
    };
  }
}

export default LmRouter;
