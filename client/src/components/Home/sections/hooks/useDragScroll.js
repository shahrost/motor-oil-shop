import { useRef } from "react";

function useDragScroll() {
  const rowRef = useRef(null);
  const state = useRef({ dragging: false, startX: 0, startScrollLeft: 0, moved: false });

  const handlePointerDown = (e) => {
    // only a held-down left mouse button starts a drag — leave touch/pen
    // alone so native touch scrolling keeps working untouched.
    if (e.pointerType !== "mouse" || e.button !== 0) return;

    const row = rowRef.current;
    if (!row) return;

    state.current.dragging = true;
    state.current.moved = false;
    state.current.startX = e.clientX;
    state.current.startScrollLeft = row.scrollLeft;

    row.setPointerCapture(e.pointerId);
    row.classList.add("cursor-grabbing");
  };

  const handlePointerMove = (e) => {
    if (!state.current.dragging) return;

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

    if (Math.abs(delta) > 3) state.current.moved = true;

    row.scrollLeft = state.current.startScrollLeft - delta;
  };

  const stopDragging = (e) => {
    if (!state.current.dragging) return;

    state.current.dragging = false;

    const row = rowRef.current;
    row?.classList.remove("cursor-grabbing");

    if (row && e && row.hasPointerCapture(e.pointerId)) {
      row.releasePointerCapture(e.pointerId);
    }
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
