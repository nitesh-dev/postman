import { useState } from "react";
import LineDragger from "./LineDragger";
import CollectionIcon from "../icon/CollectionIcon";
import "../../styles/editor/left-sidebar.css";
import SearchBar from "../widget/SearchBar";
import RequestHierarchy from "./RequestHierarchy";

enum Tab {
  None,
  Collection,
  Environment,
}

export default function EditorLeftSidebar({
  onDrag,
}: {
  onDrag(x: number, y: number): void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Collection);

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
        <div className="icon-bar">
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
        {activeTab == Tab.Collection && (
          <div className="left-tab-area">
            <SearchBar/>
            <RequestHierarchy/>
          </div>
        )}

        {activeTab == Tab.Environment && (
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
