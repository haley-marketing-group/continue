import { describe, expect, it } from "vitest";

import LmRouter from "./LmRouter";

describe("LmRouter", () => {
  it("should have correct provider name", () => {
    expect(LmRouter.providerName).toBe("lmrouter");
  });

  it("should have correct default options", () => {
    expect(LmRouter.defaultOptions.apiBase).toBe("http://localhost:4000/v1/");
    expect(LmRouter.defaultOptions.model).toBe("router/auto");
    expect(LmRouter.defaultOptions.useLegacyCompletionsEndpoint).toBe(false);
  });

  it("should support reasoning fields", () => {
    const lmRouter = new LmRouter({
      model: "router/auto",
    });

    // LmRouter routes to models that may support reasoning
    expect(lmRouter["supportsReasoningField"]).toBe(true);
    expect(lmRouter["supportsReasoningDetailsField"]).toBe(true);
  });

  it("should include Continue User-Agent header", () => {
    const lmRouter = new LmRouter({
      model: "router/auto",
    });

    const headers = lmRouter["_getHeaders"]();

    expect(headers["User-Agent"]).toMatch(/^Continue\//);
    expect(headers["X-Continue-Provider"]).toBe("lmrouter");
  });

  it("should accept all routing profiles", () => {
    const profiles = [
      "router/auto",
      "router/code",
      "router/reasoning",
      "router/vision",
      "router/fast",
      "router/long_context",
    ];

    for (const profile of profiles) {
      const lmRouter = new LmRouter({ model: profile });
      expect(lmRouter.model).toBe(profile);
    }
  });
});
