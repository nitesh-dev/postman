import { useContext, useEffect, useRef, useState } from "react";
import LineDragger from "./LineDragger";
import CollectionIcon from "../icon/CollectionIcon";
import "../../styles/editor/left-sidebar.css";
import SearchBar from "../widget/SearchBar";
import RequestHierarchy from "./RequestHierarchy";
import { EditorLayoutContext, LeftSideBarPanelType } from "../../pages/Editor";

export default function EditorLeftSidebar({
  onDrag,
}: {
  onDrag(x: number, y: number): void;
}) {
  const layoutProps = useContext(EditorLayoutContext);

  const [activeTab, setActiveTab] = useState<LeftSideBarPanelType>(
    LeftSideBarPanelType.none
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
        <div className="icon-bar" style={{width: layoutProps?.current.leftSidebar.iconPanelWidth}}>
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
        {activeTab == LeftSideBarPanelType.collection && (
          <div className="left-tab-area">
            <SearchBar />
            <RequestHierarchy />
          </div>
        )}

        {activeTab == LeftSideBarPanelType.environment && (
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
