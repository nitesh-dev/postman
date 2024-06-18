import "@/styles/editor/left-sidebar.css";
import SearchBar from "../widget/SearchBar";
import RequestHierarchy from "./RequestHierarchy";
import { PanelType, useEditorPropStore } from "../../store/editorPropStore";
import { useShallow } from "zustand/react/shallow";

export default function EditorLeftSidebar() {
  const [activeTab, setActiveTab] = useEditorPropStore(
    useShallow((state) => [
      state.leftSidebar.openedPanel,
      state.setOpenedLeftSidebarPanel,
    ])
  );

  return (
    <div className="left-sidebar">
      {/* <div className="header">
        <span>Nitesh Collection</span>
        <div className="right">
          <button className="btn outline">New</button>
          <button className="btn primary">Import</button>
        </div>
      </div> */}
      <div className="content">
        {/* tab - content */}
        {activeTab == PanelType.collection && (
          <div className="left-tab-area">
            <SearchBar />
            <RequestHierarchy />
          </div>
        )}

        {activeTab == PanelType.environment && (
          <div className="left-tab-area">
            <p>Hello left area</p>
          </div>
        )}
      </div>
    </div>
  );
}
