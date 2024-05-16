import { useEffect, useRef } from "react";
import "../../styles/line-dragger.css";

export default function LineDragger({
  isVertical,
  onMove,
  isDisabled,
  isLtr,
}: {
  isVertical: boolean;
  onMove(x: number, y: number): void;
  isDisabled: boolean;
  isLtr: boolean;
}) {
  const isDown = useRef(false);

  function onMouseMove(e: MouseEvent) {
    if (!isDown.current) return;
    onMove(e.clientX, e.clientY);
  }

  function onMouseUp() {
    isDown.current = false;
  }

  function onMouseDown() {
    isDown.current = true;
  }

  useEffect(() => {
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    !isDisabled && (
      <div
        onMouseDown={onMouseDown}
        className={
          "line-dragger " +
          (isVertical ? "vertical " : "horizontal ") +
          (isLtr ? "ltr" : "rtl")
        }
      >
        <span className="overlay-border animation"></span>
      </div>
    )
  );
}
