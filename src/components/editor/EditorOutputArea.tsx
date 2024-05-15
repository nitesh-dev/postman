import LineDragger from "./LineDragger";

export default function EditorOutputArea() {
  return (
    <div className="editor-output-area">
      <LineDragger isVertical={false} />
      <div className="content">
        <p>Hello footer</p>
      </div>
    </div>
  );
}
