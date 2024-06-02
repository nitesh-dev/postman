import EditorOutputArea from "./EditorOutputArea";
import EditorRequestArea from "./EditorRequestArea";
import { useEditorPropStore } from "../../store/editorPropStore";
import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";
import Split from "react-split";

export default function EditorMainArea() {
  return (
    <Split gutterSize={1} className="split editor-main" direction="vertical">
      <EditorRequestArea />
      <EditorOutputArea />
    </Split>
  );
}
