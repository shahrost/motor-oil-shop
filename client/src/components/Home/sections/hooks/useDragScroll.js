import { useEffect, useRef } from "react";

function useDragScroll() {
  const rowRef = useRef(null);
  const state = useRef({ dragging: false, startX: 0, startScrollLeft: 0, moved: false });

  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      if (!state.current.dragging) return;

      const row = rowRef.current;
      if (!row) return;

      const delta = e.pageX - state.current.startX;

      if (Math.abs(delta) > 3) state.current.moved = true;

      row.scrollLeft = state.current.startScrollLeft - delta;
    };

    const handleWindowMouseUp = () => {
      if (!state.current.dragging) return;

      state.current.dragging = false;
      rowRef.current?.classList.remove("cursor-grabbing");
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    const row = rowRef.current;
    if (!row) return;

    state.current.dragging = true;
    state.current.moved = false;
    state.current.startX = e.pageX;
    state.current.startScrollLeft = row.scrollLeft;

    row.classList.add("cursor-grabbing");
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
      onMouseDown: handleMouseDown,
      onClickCapture: handleClickCapture,
    },
  };
}

export default useDragScroll;
