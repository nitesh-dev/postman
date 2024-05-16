import LineDragger from "./LineDragger";

export default function EditorOutputArea({
  onDrag,
}: {
  onDrag: (x: number, y: number) => void;
}) {
  return (
    <div className="editor-output-area">
      <LineDragger
        isVertical={false}
        onMove={onDrag}
        isDisabled={false}
        isLtr={false}
      />
      <div className="content">
        <p>Hello footer</p>
      </div>
    </div>
  );
}
