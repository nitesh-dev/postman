import "@/styles/editor/request-area.css"
import EditorRequestTab from "../EditorRequestTab"
import BreadCrumb from "./BreadCrumb"

export default function EditorRequestArea() {
  return (
    <div className="editor-request-area">
      <EditorRequestTab/>
      <BreadCrumb path="dummy/nitesh/auth-request"/>

      <div className="request-content-area">
        <p>hello request content</p>
      </div>
    </div>
  );
}
