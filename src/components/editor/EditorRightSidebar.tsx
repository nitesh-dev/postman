import "../@/styles/editor/right-sidebar.css";
import { useContext } from "react";
import { useEditorPropStore } from "../../store/editorPropStore";
import { useShallow } from "zustand/react/shallow";

export default function EditorRightSidebar() {
  const [activeTab, setActiveTab] = useEditorPropStore(
    useShallow((state) => [
      state.rightSidebar.openedPanel,
      state.setOpenedRightSidebarPanel,
    ])
  );
  return (
    <div className="right-sidebar">
      <div className="right-content-area">
        <p>hello right area</p>
      </div>
    </div>
  );
}
