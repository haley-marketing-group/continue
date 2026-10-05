import { OpenAIApi } from "./OpenAI.js";
import { OpenAIConfig } from "../types.js";

export interface LmRouterConfig extends OpenAIConfig {}

/**
 * LM Router API adapter
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
export class LmRouterApi extends OpenAIApi {
  constructor(config: LmRouterConfig) {
    super({
      ...config,
      apiBase: config.apiBase ?? "http://localhost:4000/v1/",
    });
  }

  /**
   * Override headers to include Continue-specific User-Agent
   * This helps LM Router track integration usage and optimize accordingly
   */
  protected override getHeaders(): Record<string, string> {
    return {
      ...super.getHeaders(),
      "User-Agent": "Continue/IDE",
      "X-Continue-Provider": "lmrouter",
    };
  }
}

export default LmRouterApi;
