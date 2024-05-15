import EditorOutputArea from "./EditorOutputArea";
import EditorRequestArea from "./EditorRequestArea";

export default function EditorMainArea() {
  return (
    <div className="editor-main">
      <EditorRequestArea />
      <EditorOutputArea />
    </div>
  );
}
