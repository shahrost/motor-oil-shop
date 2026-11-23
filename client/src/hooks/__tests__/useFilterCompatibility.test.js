import { beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, renderHook } from "../../../test/hookHarness";
import { getCachedCompatibility, loadCompatibility } from "../../services/filterCompatibilityCache";
import useFilterCompatibility from "../useFilterCompatibility";

vi.mock("../../services/filterCompatibilityCache", () => ({
  getCachedCompatibility: vi.fn(),
  loadCompatibility: vi.fn(),
}));

const data = { "LF-1": ["پراید"] };

beforeEach(() => {
  vi.clearAllMocks();
  getCachedCompatibility.mockReturnValue(null);
  loadCompatibility.mockResolvedValue(data);
});

describe("useFilterCompatibility", () => {
  it("does not request data while disabled", async () => {
    const hook = renderHook(() => useFilterCompatibility(false));
    expect(hook.render()).toBeNull();
    await flushPromises();
    expect(loadCompatibility).not.toHaveBeenCalled();
  });

  it("loads once when enabled and returns the data", async () => {
    const hook = renderHook(() => useFilterCompatibility(true));
    expect(hook.render()).toBeNull();
    await flushPromises();
    expect(hook.render()).toBe(data);
    hook.render();
    expect(loadCompatibility).toHaveBeenCalledTimes(1);
  });

  it("uses cached data without a request", async () => {
    getCachedCompatibility.mockReturnValue(data);
    const hook = renderHook(() => useFilterCompatibility(true));
    expect(hook.render()).toBe(data);
    await flushPromises();
    expect(loadCompatibility).not.toHaveBeenCalled();
  });

  it("ignores load failures", async () => {
    loadCompatibility.mockRejectedValue(new Error("offline"));
    const hook = renderHook(() => useFilterCompatibility(true));
    hook.render();
    await flushPromises();
    expect(hook.render()).toBeNull();
  });
});
