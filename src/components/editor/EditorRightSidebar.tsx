import LineDragger from "./LineDragger";
import "../../styles/editor/right-sidebar.css";
import { useContext } from "react";
import { useEditorPropStore } from "../../store/editorPropStore";
import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";

export default function EditorRightSidebar({
  onDrag,
}: {
  onDrag(x: number, y: number): void;
}) {
  const [panelWidth, activeTab, setActiveTab] = useEditorPropStore(
    useShallow((state) => [
      state.rightSidebar.iconPanelWidth,
      state.rightSidebar.openedPanel,
      state.setOpenedRightSidebarPanel,
    ])
  );
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
      <div className="icon-bar" style={{ width: panelWidth }}>
        <div className="tab-item">hello Tab</div>
        <div className="tab-item">hello Tab</div>
      </div>
    </div>
  );
}
