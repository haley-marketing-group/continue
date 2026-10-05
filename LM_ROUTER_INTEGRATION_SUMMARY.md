# LM Router Integration Summary

This document summarizes all changes made to integrate LM Router into the Continue fork.

## Files Created/Modified

### 1. Core LLM Provider (`/tmp/continue/core/llm/llms/LmRouter.ts`)

- Created new LLM provider class extending OpenAI
- Implements LM Router-specific features:
  - Default API base: `http://localhost:4000/v1/`
  - Default model: `router/auto`
  - Support for reasoning fields
  - Continue-specific User-Agent header
  - Supports all LM Router routing profiles

### 2. OpenAI Adapters API (`/tmp/continue/packages/openai-adapters/src/apis/LmRouter.ts`)

- Created API adapter class `LmRouterApi`
- Extends `OpenAIApi` for OpenAI-compatible interface
- Implements LM Router-specific headers

### 3. OpenAI Adapters Index (`/tmp/continue/packages/openai-adapters/src/index.ts`)

Modified to:

- Import `LmRouterApi` from `./apis/LmRouter.js` (line ~17)
- Add case "lmrouter" to switch statement (line ~185)
- Export `LmRouterApi` (line ~249)

### 4. Core LLM Index (`/tmp/continue/core/llm/llms/index.ts`)

Modified to:

- Import `LmRouter` from `./LmRouter` (line ~54)
- Add `LmRouter` to `LLMClasses` array (line ~115)

### 5. Tool Support (`/tmp/continue/core/llm/toolSupport.ts`)

Added support for `lmrouter` provider in `PROVIDER_TOOL_SUPPORT`:

- Handles `router/*` routing aliases
- Supports common tool-supporting patterns (Claude, Gemini, GPT-4+, O-series, etc.)

### 6. Test File (`/tmp/continue/core/llm/llms/LmRouter.vitest.ts`)

Created comprehensive tests for:

- Provider name verification
- Default options validation
- Reasoning field support
- User-Agent header
- Routing profile acceptance

## Integration Points

### 1. Configuration Support

LM Router can be configured in `config.json`:

```json
{
  "models": [
    {
      "title": "LM Router",
      "provider": "lmrouter",
      "model": "router/auto",
      "apiBase": "http://localhost:4000/v1/"
    }
  ]
}
```

### 2. Available Routing Profiles

LM Router supports these virtual models:

- `router/auto` - Automatic model selection
- `router/code` - Code-focused routing
- `router/reasoning` - Reasoning-optimized
- `router/vision` - Vision-capable
- `router/fast` - Low-latency routing
- `router/long_context` - Long-context optimized

### 3. Tool Support

LM Router automatically detects tool support based on:

- `router/*` patterns (assume support)
- Common patterns: Claude, Gemini, GPT-4+, O-series, DeepSeek, etc.

## Dependencies

- Inherits from `OpenAI` class (existing)
- Uses existing OpenAI-compatible API infrastructure
- No new external dependencies required

## Testing

Run tests with:

```bash
pnpm exec vitest run core/llm/llms/LmRouter.vitest.ts
```

## References

- LM Router GitHub: https://github.com/continuedev/lm-router
- LM Studio: https://lmstudio.ai/
