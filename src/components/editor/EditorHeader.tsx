import "@/styles/editor/editor-header.css";
import { useEditorPropStore } from "../../store/editorPropStore";
import { useShallow } from "zustand/react/shallow";

export default function EditorHeader() {
  return (
    <div className="editor-header">
      <p>Hello header</p>
    </div>
  );
}
