import { useState } from "react";
import LineDragger from "./LineDragger";

export default function EditorLeftSidebar({
  onDrag,
}: {
  onDrag(x: number, y: number): void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="left-sidebar">
      <div className="icon-bar">
        <div className="icon">icon1</div>
        <div className="icon">icon2</div>
        <div className="icon">icon3</div>
      </div>
      {isOpen && (
        <div className="left-tab-area">
          <p>Hello left area</p>
        </div>
      )}
      <LineDragger
        isVertical={true}
        onMove={onDrag}
        isDisabled={false}
        isLtr={false}
      />
    </div>
  );
}
