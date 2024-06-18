import ArrowRightIcon from "../icon/ArrowRightIcon";
import FolderIcon from "../icon/FolderIcon";
import GetIcon from "../../assets/icons/GET.svg";
import PostIcon from "../../assets/icons/POST.svg";
import PutIcon from "../../assets/icons/PUT.svg";
import PatchIcon from "../../assets/icons/PATCH.svg";
import DeleteIcon from "../../assets/icons/DELETE.svg";
import OptionsIcon from "../../assets/icons/OPTIONS.svg";
import HeadIcon from "../../assets/icons/HEAD.svg";
import { useEffect, useRef, useState } from "react";
import { getUniqueId } from "../../extra/utils";
import MoreHoriIcon from "../icon/MoreHoriIcon";
import ContextMenu, { Vector2 } from "../widget/ContextMenu";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useShallow } from "zustand/react/shallow";

export enum ChildType {
  Collection,
  Folder,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Options,
  Head,
}

export interface TreeCollection {
  id: string;
  name: string;
  isOpen: boolean;
  type: ChildType;
  children: Tree[];
}

export interface Tree {
  id: string;
  name: string;
  isFav: boolean;
  type: ChildType;
  isOpen?: boolean;
  children?: Tree[];
}

const folderContextMenuItems = [
  "Add Folder",
  "Add Request",
  "Duplicate",
  "Cut",
  "Paste",
  "Rename",
  "Delete",
];
const requestContextMenuItems = [
  "Open",
  "Duplicate",
  "Cut",
  "Rename",
  "Delete",
];

export default function RequestHierarchy() {
  const hierarchyRef = useRef<HTMLDivElement>(null);

  const [
    collections,
    addFolder,
    toggleFolder,
    addRequest,
    duplicateItem,
    renameItem,
    deleteItem,
  ] = useWorkspaceStore(
    useShallow((state) => [
      state.local.collections,
      state.addFolder,
      state.toggleFolder,
      state.addRequest,
      state.duplicateItem,
      state.renameItem,
      state.deleteItem,
    ])
  );

  // context menu
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState<Vector2>({ x: 0, y: 0 });
  const [selectedTreeId, setSelectedTreeId] = useState("");
  const [renameItemId, setRenameItemId] = useState("");
  const [contextMenuItem, setContextMenuItem] = useState<string[]>([]);

  function onMoreClick(e: React.MouseEvent, item: Tree | TreeCollection) {
    setContextMenuItem(
      item.type === ChildType.Folder || item.type === ChildType.Collection
        ? folderContextMenuItems
        : requestContextMenuItems
    );
    setSelectedTreeId(item.id);
    setIsContextMenuOpen(true);
    setContextMenuPos({ x: e.clientX, y: e.clientY });
  }

  function isFolder(id: string, items: TreeCollection[] | Tree[]) {
    for (const item of items) {
      if (item.id === id) {
        return (
          item.type === ChildType.Folder || item.type === ChildType.Collection
        );
      }

      const foundItem = isFolder(id, item.children || []);
      if (foundItem) return true;
    }

    return false;
  }

  function onContextMenuSelect(item: string) {
    setIsContextMenuOpen(false);

    if (isFolder(selectedTreeId, collections)) {
      switch (item) {
        case "Add Folder":
          addFolder(selectedTreeId);
          break;
        case "Add Request":
          addRequest(selectedTreeId);
          break;
        case "Duplicate":
          duplicateItem(selectedTreeId);
          break;
        case "Cut":
          break;
        case "Paste":
          break;
        case "Rename":
          setRenameItemId(selectedTreeId);
          makeActiveRenameInput(selectedTreeId);
          break;
        case "Delete":
          deleteItem(selectedTreeId);
          break;
        default:
          break;
      }
    } else {
      switch (item) {
        case "Open":
          break;
        case "Duplicate":
          duplicateItem(selectedTreeId);
          break;
        case "Cut":
          break;
        case "Rename":
          setRenameItemId(selectedTreeId);
          makeActiveRenameInput(selectedTreeId);
          break;
        case "Delete":
          deleteItem(selectedTreeId);
          break;
        default:
          break;
      }
    }
  }

  function makeActiveRenameInput(id: string) {
    const element = document
      .getElementById(id)
      ?.getElementsByClassName("item-header")[0]
      .getElementsByTagName("input")[0];

    if (element) {
      element.focus();
      element.select();
    }
  }

  useEffect(() => {
    updateSize();

    document.addEventListener("mouseup", onMouseUp);

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  function onMouseUp(event: MouseEvent) {
    if (
      event.target instanceof HTMLElement &&
      event.target.className == "active"
    )
      return;
    setRenameItemId("");
  }

  function updateSize() {
    if (!hierarchyRef.current) return;

    console.log(window.innerHeight, hierarchyRef.current.offsetTop);

    let height = window.innerHeight - hierarchyRef.current.offsetTop - 25 - 41; // footer height & header height
    hierarchyRef.current.style.height = height + "px";
  }

  function getIcon(type: ChildType) {
    switch (type) {
      case ChildType.Folder:
        return <FolderIcon />;
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

  function onItemClick(hierarchy: Tree | TreeCollection, target: HTMLElement) {
    if (target.classList.contains("right")) return;

    if (
      hierarchy.type === ChildType.Folder ||
      hierarchy.type === ChildType.Collection
    ) {
      toggleFolder(hierarchy.id);
    }

    setSelectedTreeId(hierarchy.id);
  }

  function renderTree(hierarchy: Tree[] | TreeCollection[], times: number) {
    return hierarchy.map((item, index) => (
      <div className="item" key={index}>
        <div
          className={
            "item-header" +
            (item.type == ChildType.Folder ? " folder" : "") +
            (selectedTreeId === item.id ? " active" : "")
          }
          style={{ paddingLeft: times * 2 + 1 + "rem" }}
          onClick={(e) => onItemClick(item, e.target as HTMLElement)}
        >
          {item.type == ChildType.Folder ||
          item.type == ChildType.Collection ? (
            <ArrowRightIcon
              className={"icon-arrow" + (item.isOpen ? " open" : "")}
            />
          ) : (
            <div className="indent"></div>
          )}
          {getIcon(item.type)}
          <input
            type="text"
            value={item.name}
            disabled={renameItemId != item.id}
            className={renameItemId === item.id ? "active" : ""}
            onChange={(e) => renameItem(item.id, e.target.value)}
          />
          <div className="right" onClick={(e) => onMoreClick(e, item)}>
            <MoreHoriIcon />
          </div>
        </div>

        {item.children && item.isOpen && (
          <div className="item-children">
            {renderTree(item.children, times + 1)}
            <span
              className="line"
              style={{ left: `calc(${times * 2 + 1}rem + 10px)` }}
            ></span>
          </div>
        )}
      </div>
    ));
  }
  return (
    <div
      ref={hierarchyRef}
      id="request-hierarchy"
      className="request-hierarchy"
    >
      <div>{renderTree(collections, 0)}</div>
      <ContextMenu
        items={contextMenuItem}
        onSelect={onContextMenuSelect}
        open={isContextMenuOpen}
        setOpen={setIsContextMenuOpen}
        pos={contextMenuPos}
      />
    </div>
  );
}
