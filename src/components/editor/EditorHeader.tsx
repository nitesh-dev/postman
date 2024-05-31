
import "../../styles/editor/editor-header.css";
import { useEditorPropStore } from "../../store/editorPropStore";
import { useShallow } from "zustand/react/shallow";

export default function EditorHeader() {
  const [headerHeight] = useEditorPropStore(
    useShallow((state) => [state.header.height])
  );

  return (
    <div className="editor-header" style={{ height: headerHeight }}>
      <p>Hello header</p>
    </div>
  );
}
