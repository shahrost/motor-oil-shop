import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "../../../test/hookHarness";
import useClickOutside from "../useClickOutside";

// No DOM in these tests: a minimal document stub records pointerdown listeners.
const listeners = new Set();
vi.stubGlobal("document", {
  addEventListener: (type, fn) => type === "pointerdown" && listeners.add(fn),
  removeEventListener: (type, fn) => type === "pointerdown" && listeners.delete(fn),
});
const press = (target) => [...listeners].forEach((fn) => fn({ target }));

const inside = {};
const rootRef = { current: { contains: (target) => target === inside } };

afterEach(() => listeners.clear());

describe("useClickOutside", () => {
  it("calls onOutside only for presses outside the root while active", () => {
    const onOutside = vi.fn();
    const hook = renderHook(() => useClickOutside(rootRef, true, onOutside));
    hook.render();
    press(inside);
    expect(onOutside).not.toHaveBeenCalled();
    press({});
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("listens to nothing while inactive", () => {
    const onOutside = vi.fn();
    renderHook(() => useClickOutside(rootRef, false, onOutside)).render();
    expect(listeners.size).toBe(0);
  });

  it("removes its listener on unmount", () => {
    const hook = renderHook(() => useClickOutside(rootRef, true, vi.fn()));
    hook.render();
    expect(listeners.size).toBe(1);
    hook.unmount();
    expect(listeners.size).toBe(0);
  });
});
