import Dropdown from "./Dropdown";
import "@/styles/widgets/context-menu.css";

export interface Vector2 {
  x: number;
  y: number;
}


export default function ContextMenu({
  items,
  onSelect,
  open,
  setOpen,
  pos,
}: {
  items: string[];
  onSelect: (item: string) => void;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  pos: Vector2;
}) {
  return (
    open && (
      <div style={{ left: pos.x, top: pos.y }} className="context-menu">
        <Dropdown items={items} onSelect={onSelect} />
        {/* <div className="layer" onClick={() => setOpen(false)}></div> */}
      </div>
    )
  );
}
