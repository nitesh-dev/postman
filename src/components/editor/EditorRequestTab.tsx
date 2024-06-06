import "../../styles/editor/editor-request-tab.css";
import postIcon from "../../assets/icons/POST.svg";
import CloseIcon from "../icon/CloseIcon";

export default function EditorRequestTab() {
  return (
    <div className="editor-request-tab">
      <div className="tab-item">
        <img src={postIcon} /> hello Tab
        <button><CloseIcon/></button>
      </div>
      <span></span>
      <div className="tab-item active">
        <img src={postIcon} /> hello Tab
        <button><CloseIcon/></button>
      </div>
    </div>
  );
}
