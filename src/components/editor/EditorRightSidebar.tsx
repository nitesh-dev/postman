import LineDragger from "./LineDragger";
import "../../styles/editor/right-sidebar.css"

export default function EditorRightSidebar({
  onDrag,
}: {
  onDrag(x: number, y: number): void;
}) {
  return (
    <div className="right-sidebar">
      <LineDragger isVertical={true} onMove={onDrag} isDisabled={false} isLtr={true} />
      <div className="right-content-area">
        <p>hello right area</p>
      </div>
      <div className="icon-bar">
        <div className="tab-item">hello Tab</div>
        <div className="tab-item">hello Tab</div>
      </div>
    </div>
  );
}
