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
  // const [collections, setCollections] = useState<TreeCollection[]>([
  //   {
  //     id: getUniqueId(),
  //     name: "hello collection",
  //     type: ChildType.Collection,
  //     isOpen: true,
  //     children: [
  //       {
  //         id: getUniqueId(),
  //         name: "Request 1",
  //         isFav: true,
  //         type: ChildType.Post,
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Request 1",
  //         isFav: true,
  //         type: ChildType.Patch,
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Request 1",
  //         isFav: true,
  //         type: ChildType.Delete,
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Request 1",
  //         isFav: true,
  //         type: ChildType.Head,
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Request 1",
  //         isFav: true,
  //         type: ChildType.Options,
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Folder 2",
  //         isFav: true,
  //         type: ChildType.Folder,
  //         isOpen: true,
  //         children: [],
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Folder 3",
  //         isFav: true,
  //         type: ChildType.Folder,
  //         isOpen: true,
  //         children: [
  //           {
  //             id: getUniqueId(),
  //             name: "Request 1",
  //             isFav: true,
  //             type: ChildType.Post,
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Request 1",
  //             isFav: true,
  //             type: ChildType.Patch,
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Request 1",
  //             isFav: true,
  //             type: ChildType.Delete,
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Request 1",
  //             isFav: true,
  //             type: ChildType.Head,
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Request 1",
  //             isFav: true,
  //             type: ChildType.Options,
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Folder 2",
  //             isFav: true,
  //             type: ChildType.Folder,
  //             isOpen: true,
  //             children: [
  //               {
  //                 id: getUniqueId(),
  //                 name: "Request 1",
  //                 isFav: true,
  //                 type: ChildType.Post,
  //               },
  //               {
  //                 id: getUniqueId(),
  //                 name: "Request 1",
  //                 isFav: true,
  //                 type: ChildType.Patch,
  //               },
  //               {
  //                 id: getUniqueId(),
  //                 name: "Request 1",
  //                 isFav: true,
  //                 type: ChildType.Delete,
  //               },
  //               {
  //                 id: getUniqueId(),
  //                 name: "Request 1",
  //                 isFav: true,
  //                 type: ChildType.Head,
  //               },
  //               {
  //                 id: getUniqueId(),
  //                 name: "Request 1",
  //                 isFav: true,
  //                 type: ChildType.Options,
  //               },
  //               {
  //                 id: getUniqueId(),
  //                 name: "Folder 2",
  //                 isFav: true,
  //                 type: ChildType.Folder,
  //                 isOpen: true,
  //                 children: [],
  //               },
  //               {
  //                 id: getUniqueId(),
  //                 name: "Folder 3",
  //                 isFav: true,
  //                 type: ChildType.Folder,
  //                 isOpen: true,
  //                 children: [
  //                   {
  //                     id: getUniqueId(),
  //                     name: "Request 1",
  //                     isFav: true,
  //                     type: ChildType.Post,
  //                   },
  //                   {
  //                     id: getUniqueId(),
  //                     name: "Request 1",
  //                     isFav: true,
  //                     type: ChildType.Patch,
  //                   },
  //                   {
  //                     id: getUniqueId(),
  //                     name: "Request 1",
  //                     isFav: true,
  //                     type: ChildType.Delete,
  //                   },
  //                   {
  //                     id: getUniqueId(),
  //                     name: "Request 1",
  //                     isFav: true,
  //                     type: ChildType.Head,
  //                   },
  //                   {
  //                     id: getUniqueId(),
  //                     name: "Request 1",
  //                     isFav: true,
  //                     type: ChildType.Options,
  //                   },
  //                   {
  //                     id: getUniqueId(),
  //                     name: "Folder 2",
  //                     isFav: true,
  //                     type: ChildType.Folder,
  //                     isOpen: true,
  //                     children: [],
  //                   },
  //                   {
  //                     id: getUniqueId(),
  //                     name: "Folder 3",
  //                     isFav: true,
  //                     type: ChildType.Folder,
  //                     isOpen: true,
  //                     children: [],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Folder 3",
  //             isFav: true,
  //             type: ChildType.Folder,
  //             isOpen: true,
  //             children: [],
  //           },
  //         ],
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Request 1",
  //         isFav: true,
  //         type: ChildType.Post,
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Request 1",
  //         isFav: true,
  //         type: ChildType.Patch,
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Request 1",
  //         isFav: true,
  //         type: ChildType.Delete,
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Request 1",
  //         isFav: true,
  //         type: ChildType.Head,
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Request 1",
  //         isFav: true,
  //         type: ChildType.Options,
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Folder 2",
  //         isFav: true,
  //         type: ChildType.Folder,
  //         isOpen: true,
  //         children: [],
  //       },
  //       {
  //         id: getUniqueId(),
  //         name: "Folder 3",
  //         isFav: true,
  //         type: ChildType.Folder,
  //         isOpen: true,
  //         children: [
  //           {
  //             id: getUniqueId(),
  //             name: "Request 1",
  //             isFav: true,
  //             type: ChildType.Post,
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Request 1",
  //             isFav: true,
  //             type: ChildType.Patch,
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Request 1",
  //             isFav: true,
  //             type: ChildType.Delete,
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Request 1",
  //             isFav: true,
  //             type: ChildType.Head,
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Request 1",
  //             isFav: true,
  //             type: ChildType.Options,
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Folder 2",
  //             isFav: true,
  //             type: ChildType.Folder,
  //             isOpen: true,
  //             children: [],
  //           },
  //           {
  //             id: getUniqueId(),
  //             name: "Folder 3",
  //             isFav: true,
  //             type: ChildType.Folder,
  //             isOpen: true,
  //             children: [],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

  const [collections, addFolder, toggleFolder] = useWorkspaceStore(
    useShallow((state) => [
      state.local.collections,
      state.addFolder,
      state.toggleFolder,
    ])
  );

  // context menu
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState<Vector2>({ x: 0, y: 0 });
  const [selectedTreeId, setSelectedTreeId] = useState("");
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

    console.log("selected: ", item);

    if (isFolder(selectedTreeId, collections)) {
      switch (item) {
        case "Add Folder":
          addFolder(selectedTreeId);
          break;
        case "Add Request":
          break;
        case "Duplicate":
          break;
        case "Cut":
          break;
        case "Paste":
          break;
        case "Rename":
          break;
        case "Delete":
          break;
        default:
          break;
      }
    } else {
    }
  }

  useEffect(() => {
    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  function updateSize() {
    if (!hierarchyRef.current) return;

    console.log(window.innerHeight, hierarchyRef.current.offsetTop);

    let height = window.innerHeight - hierarchyRef.current.offsetTop - 25 - 41; // footer height & header height
    hierarchyRef.current.style.height = height + "px";
  }

  function updateHierarchy(
    id: string,
    tree: Tree[],
    callback: (tree: Tree) => Tree
  ) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
        tree[i] = { ...callback(tree[i]) };
        return;
      }
      if (tree[i].children) {
        updateHierarchy(id, tree[i].children!!, callback);
      }
    }
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
        return null;
    }
  }

  // function toggleHierarchy(tree: Tree) {
  //   updateHierarchy(tree.id, hierarchy, (item) => {
  //     item.isOpen = !item.isOpen;
  //     return item;
  //   });
  //   setHierarchy([...hierarchy]);
  // }

  function onItemClick(hierarchy: Tree, target: HTMLElement) {
    if (target.classList.contains("right")) return;

    if (hierarchy.type === ChildType.Folder) {
      toggleFolder(hierarchy.id);
    }

    setSelectedTreeId(hierarchy.id);
  }

  function onCollectionClick(collection: TreeCollection, target: HTMLElement) {
    if (target.classList.contains("right")) return;
    toggleFolder(collection.id);
    setSelectedTreeId(collection.id);
  }

  function renderTree(hierarchy: Tree[], times: number) {
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
          {item.type == ChildType.Folder ? (
            <ArrowRightIcon
              className={"icon-arrow" + (item.isOpen ? " open" : "")}
            />
          ) : (
            <div className="indent"></div>
          )}
          {getIcon(item.type)}
          <input type="text" disabled value={item.name} />
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

  function renderCollection(collections: TreeCollection[]) {
    return collections.map((item, index) => (
      <div className="item" key={index}>
        <div
          className={
            "item-header folder" + (selectedTreeId === item.id ? " active" : "")
          }
          style={{ paddingLeft: 1 + "rem" }}
          onClick={(e) => onCollectionClick(item, e.target as HTMLElement)}
        >
          <ArrowRightIcon
            className={"icon-arrow" + (item.isOpen ? " open" : "")}
          />
          <span></span>
          <input type="text" disabled value={item.name} />
          <div className="right" onClick={(e) => onMoreClick(e, item)}>
            <MoreHoriIcon />
          </div>
        </div>

        {item.children && item.isOpen && (
          <div className="item-children">
            {renderTree(item.children, 1)}
            <span
              className="line"
              style={{ left: `calc(${1}rem + 10px)` }}
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
      <div>{renderCollection(collections)}</div>
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
