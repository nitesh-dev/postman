import LineDragger from "./LineDragger";

export default function EditorRightSidebar() {
  return (
    <div className="right-sidebar">
      <LineDragger isVertical={true} />
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
