import { useRef } from "react";

const DRAG_THRESHOLD = 3;

function useDragScroll() {
  const rowRef = useRef(null);
  const state = useRef({
    pressed: false,
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const handlePointerDown = (e) => {
    // only a held-down left mouse button starts a drag — leave touch/pen
    // alone so native touch scrolling keeps working untouched.
    if (e.pointerType !== "mouse" || e.button !== 0) return;

    const row = rowRef.current;
    if (!row) return;

    // don't capture the pointer yet — capturing immediately retargets the
    // eventual click event away from whatever was actually pressed (e.g. a
    // product link), silently breaking plain taps that never turn into a
    // drag. Capture is deferred to the first move that crosses the
    // threshold, once we know it's a genuine drag.
    state.current.pressed = true;
    state.current.dragging = false;
    state.current.moved = false;
    state.current.startX = e.clientX;
    state.current.startScrollLeft = row.scrollLeft;
  };

  const handlePointerMove = (e) => {
    if (!state.current.pressed) return;

    // self-heal if the button was released without a pointerup ever
    // reaching us (e.g. focus lost mid-drag) — otherwise a stray drag
    // flag stuck "on" would make the row jump on plain mouse movement.
    if (e.buttons !== 1) {
      stopDragging(e);
      return;
    }

    const row = rowRef.current;
    if (!row) return;

    const delta = e.clientX - state.current.startX;

    if (!state.current.dragging) {
      if (Math.abs(delta) <= DRAG_THRESHOLD) return;

      state.current.dragging = true;
      state.current.moved = true;
      row.setPointerCapture(e.pointerId);
      row.classList.add("cursor-grabbing");
    }

    row.scrollLeft = state.current.startScrollLeft - delta;
  };

  const stopDragging = (e) => {
    if (!state.current.pressed) return;

    const row = rowRef.current;

    if (state.current.dragging) {
      row?.classList.remove("cursor-grabbing");

      if (row && e && row.hasPointerCapture(e.pointerId)) {
        row.releasePointerCapture(e.pointerId);
      }
    }

    state.current.pressed = false;
    state.current.dragging = false;
  };

  const handleClickCapture = (e) => {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return {
    rowRef,
    dragHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: stopDragging,
      onPointerCancel: stopDragging,
      onClickCapture: handleClickCapture,
    },
  };
}

export default useDragScroll;
