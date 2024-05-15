import EditorOutputArea from "./EditorOutputArea";
import EditorRequestArea from "./EditorRequestArea";
import EditorRightSidebar from "./EditorRightSidebar";

export default function EditorMainArea() {
  return (
    <div className="editor-main">
      <div className="main-holder">
        <EditorRequestArea />
        <EditorOutputArea />
      </div>

      <EditorRightSidebar />
    </div>
  );
}
