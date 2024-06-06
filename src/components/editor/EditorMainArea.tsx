import EditorOutputArea from "./EditorOutputArea";
import EditorRequestArea from "./EditorRequestArea";
import Split from "react-split";

export default function EditorMainArea() {
  return (
    <Split gutterSize={1} className="split editor-main" direction="vertical">
      <EditorRequestArea />
      <EditorOutputArea />
    </Split>
  );
}
