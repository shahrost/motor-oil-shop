import { afterEach, vi } from "vitest";

// State/effect runner for logic and promise boundaries; it does not simulate a DOM.
const runtime = vi.hoisted(() => ({ current: null }));
vi.mock("react", async (importOriginal) => ({
  ...await importOriginal(),
  useState: (initial) => runtime.current.state(initial),
  useRef: (initial) => runtime.current.ref(initial),
  useEffect: (effect, deps) => runtime.current.effect(effect, deps),
  useMemo: (factory, deps) => runtime.current.memo(factory, deps),
  useCallback: (callback, deps) => runtime.current.memo(() => callback, deps),
  useContext: (context) => runtime.current.contexts.get(context),
}));

const runners = new Set();
afterEach(() => {
  for (const runner of runners) runner.unmount();
  runners.clear();
});

export function renderHook(callback, contexts = new Map()) {
  const slots = [], cleanups = new Map();
  let cursor = 0, effects = [];
  const changed = (previous, next) => !previous || !next || previous.length !== next.length || next.some((value, index) => !Object.is(value, previous[index]));
  const runner = {
    contexts,
    state(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === "function" ? initial() : initial;
      return [slots[index], (value) => { slots[index] = typeof value === "function" ? value(slots[index]) : value; }];
    },
    ref(initial) {
      const index = cursor++;
      return slots[index] ||= { current: initial };
    },
    memo(factory, deps) {
      const index = cursor++;
      if (!slots[index] || changed(slots[index].deps, deps)) slots[index] = { deps, value: factory() };
      return slots[index].value;
    },
    effect(effect, deps) {
      const index = cursor++;
      if (changed(slots[index], deps)) {
        slots[index] = deps;
        effects.push(() => { cleanups.get(index)?.(); cleanups.set(index, effect()); });
      }
    },
    render() {
      cursor = 0;
      effects = [];
      runtime.current = runner;
      let result;
      try { result = callback(); } finally { runtime.current = null; }
      effects.forEach((effect) => effect());
      return result;
    },
    unmount() { cleanups.forEach((cleanup) => cleanup?.()); cleanups.clear(); },
  };
  runners.add(runner);
  return runner;
}

export async function flushPromises() {
  for (let index = 0; index < 10; index += 1) await Promise.resolve();
}
