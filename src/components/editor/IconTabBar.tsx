import CollectionIcon from "../icon/CollectionIcon";
import "../../styles/editor/icon-tab-bar.css";

export default function IconTabBar({ isRight }: { isRight: boolean }) {
  return (
    <div className={"icon-bar" + (isRight? " right"  :"")}>
      <button className="icon btn icon-btn active">
        <CollectionIcon />
      </button>
      <button className="icon btn icon-btn">
        <CollectionIcon />
      </button>
      <button className="icon btn icon-btn">
        <CollectionIcon />
      </button>
    </div>
  );
}
