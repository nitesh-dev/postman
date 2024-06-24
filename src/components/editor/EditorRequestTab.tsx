import "@/styles/editor/editor-request-tab.css";
import CloseIcon from "../icon/CloseIcon";
import { ChildType } from "./RequestHierarchy";

import GetIcon from "@/assets/icons/GET.svg";
import PostIcon from "@/assets/icons/POST.svg";
import PutIcon from "@/assets/icons/PUT.svg";
import PatchIcon from "@/assets/icons/PATCH.svg";
import DeleteIcon from "@/assets/icons/DELETE.svg";
import OptionsIcon from "@/assets/icons/OPTIONS.svg";
import HeadIcon from "@/assets/icons/HEAD.svg";

export interface EditorRequestTabProps {
  id: string;
  name: string;
  type: ChildType;
  isSaved: boolean;
}

export default function EditorRequestTab({
  activeTab,
  setActiveTab,
  items,
  onTabClose,
}: {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  items: EditorRequestTabProps[];
  onTabClose: (tabId: string) => void;
}) {
  function getIcon(type: ChildType) {
    switch (type) {
      case ChildType.Get:
        return <img src={GetIcon} />;
      case ChildType.Post:
        return <img src={PostIcon} />;
      case ChildType.Put:
        return <img src={PutIcon} />;
      case ChildType.Patch:
        return <img src={PatchIcon} />;
      case ChildType.Delete:
        return <img src={DeleteIcon} />;
      case ChildType.Options:
        return <img src={OptionsIcon} />;
      case ChildType.Head:
        return <img src={HeadIcon} />;

      default:
        return <span></span>;
    }
  }

  return (
    <div className="editor-request-tab">
      {items.map((item, index) => (
        <div
          onClick={() => setActiveTab(item.id)}
          className={"tab-item" + (activeTab == item.id ? " active" : "")}
          key={index}
        >
          {getIcon(item.type)} {item.name}
          <button onClick={() => onTabClose(item.id)}>
            <CloseIcon />
          </button>
        </div>
      ))}

      {/* <span></span>
      <div className="tab-item active">
        <img src={postIcon} /> hello Tab
        <button><CloseIcon/></button>
      </div> */}
    </div>
  );
}
