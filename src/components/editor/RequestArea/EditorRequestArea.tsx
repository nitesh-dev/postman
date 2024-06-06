import "../../../styles/editor/request-area.css"
import EditorRequestTab from "../EditorRequestTab"

export default function EditorRequestArea() {
  return (
    <div className="editor-request-area">
      <EditorRequestTab/>

      <div className="request-content-area">
        <p>hello request content</p>
      </div>
    </div>
  );
}
