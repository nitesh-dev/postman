import { useContext } from "react";
import "../../styles/editor/editor-header.css";
import { EditorLayoutContext } from "../../pages/Editor";
export default function EditorHeader() {
  const layoutProps = useContext(EditorLayoutContext);

  return (
    <div
      className="editor-header"
      style={{ height: layoutProps?.current.header.height }}
    >
      <p>Hello header</p>
    </div>
  );
}
