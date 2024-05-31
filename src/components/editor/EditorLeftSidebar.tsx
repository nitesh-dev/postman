import LineDragger from "./LineDragger";
import CollectionIcon from "../icon/CollectionIcon";
import "../../styles/editor/left-sidebar.css";
import SearchBar from "../widget/SearchBar";
import RequestHierarchy from "./RequestHierarchy";
import { PanelType, useEditorPropStore } from "../../store/editorPropStore";
import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";

export default function EditorLeftSidebar({
  onDrag,
}: {
  onDrag(x: number, y: number): void;
}) {
  const [panelWidth, activeTab, setActiveTab] = useEditorPropStore(
    useShallow((state) => [
      state.leftSidebar.iconPanelWidth,
      state.leftSidebar.openedPanel,
      state.setOpenedLeftSidebarPanel,
    ])
  );

  return (
    <div className="left-sidebar">
      <div className="header">
        <span>Nitesh Collection</span>
        <div className="right">
          <button className="btn outline">New</button>
          <button className="btn primary">Import</button>
        </div>
      </div>
      <div className="content">
        <div className="icon-bar" style={{ width: panelWidth }}>
          <button className="icon btn icon-btn active">
            <CollectionIcon />
          </button>
          <button className="icon btn icon-btn">
            <CollectionIcon />
          </button>
          <button className="icon btn icon-btn">
            <CollectionIcon />
          </button>
        </div>

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

        {/* dragger */}
        <LineDragger
          isVertical={true}
          onMove={onDrag}
          isDisabled={false}
          isLtr={false}
        />
      </div>
    </div>
  );
}
