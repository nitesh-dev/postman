import LineDragger from "./LineDragger";
import "../../styles/editor/right-sidebar.css";
import { useContext } from "react";
import { EditorLayoutContext } from "../../pages/Editor";

export default function EditorRightSidebar({
  onDrag,
}: {
  onDrag(x: number, y: number): void;
}) {
  const layoutProps = useContext(EditorLayoutContext);
  return (
    <div className="right-sidebar">
      <LineDragger
        isVertical={true}
        onMove={onDrag}
        isDisabled={false}
        isLtr={true}
      />
      <div className="right-content-area">
        <p>hello right area</p>
      </div>
      <div
        className="icon-bar"
        style={{ width: layoutProps?.current.rightSidebar.iconPanelWidth }}
      >
        <div className="tab-item">hello Tab</div>
        <div className="tab-item">hello Tab</div>
      </div>
    </div>
  );
}
