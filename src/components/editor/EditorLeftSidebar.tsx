import LineDragger from "../LineDragger";

export default function EditorLeftSidebar() {
  return (
    <div className="left-sidebar">
      <div className="icon-bar">
        <div className="icon">icon1</div>
        <div className="icon">icon2</div>
        <div className="icon">icon3</div>
      </div>
      <div className="left-tab-area">
        <p>Hello left area</p>
      </div>
      <LineDragger />
    </div>
  );
}
