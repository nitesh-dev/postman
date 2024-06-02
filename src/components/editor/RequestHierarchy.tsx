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

export enum ChildType {
  Folder,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Options,
  Head,
}

export interface Tree {
  id: string;
  name: string;
  isFav: boolean;
  type: ChildType;
  isOpen?: boolean;
  children?: Tree[];
}

export default function RequestHierarchy() {
  const hierarchyRef = useRef<HTMLDivElement>(null);
  const [hierarchy, setHierarchy] = useState<Tree[]>([
    {
      id: getUniqueId(),
      name: "Folder 1",
      isFav: true,
      type: ChildType.Folder,
      isOpen: true,
      children: [
        {
          id: getUniqueId(),
          name: "Request 1",
          isFav: true,
          type: ChildType.Post,
        },
        {
          id: getUniqueId(),
          name: "Request 1",
          isFav: true,
          type: ChildType.Patch,
        },
        {
          id: getUniqueId(),
          name: "Request 1",
          isFav: true,
          type: ChildType.Delete,
        },
        {
          id: getUniqueId(),
          name: "Request 1",
          isFav: true,
          type: ChildType.Head,
        },
        {
          id: getUniqueId(),
          name: "Request 1",
          isFav: true,
          type: ChildType.Options,
        },
        {
          id: getUniqueId(),
          name: "Folder 2",
          isFav: true,
          type: ChildType.Folder,
          isOpen: true,
          children: [],
        },
        {
          id: getUniqueId(),
          name: "Folder 3",
          isFav: true,
          type: ChildType.Folder,
          isOpen: true,
          children: [
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: true,
              type: ChildType.Post,
            },
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: true,
              type: ChildType.Patch,
            },
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: true,
              type: ChildType.Delete,
            },
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: true,
              type: ChildType.Head,
            },
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: true,
              type: ChildType.Options,
            },
            {
              id: getUniqueId(),
              name: "Folder 2",
              isFav: true,
              type: ChildType.Folder,
              isOpen: true,
              children: [
                {
                  id: getUniqueId(),
                  name: "Request 1",
                  isFav: true,
                  type: ChildType.Post,
                },
                {
                  id: getUniqueId(),
                  name: "Request 1",
                  isFav: true,
                  type: ChildType.Patch,
                },
                {
                  id: getUniqueId(),
                  name: "Request 1",
                  isFav: true,
                  type: ChildType.Delete,
                },
                {
                  id: getUniqueId(),
                  name: "Request 1",
                  isFav: true,
                  type: ChildType.Head,
                },
                {
                  id: getUniqueId(),
                  name: "Request 1",
                  isFav: true,
                  type: ChildType.Options,
                },
                {
                  id: getUniqueId(),
                  name: "Folder 2",
                  isFav: true,
                  type: ChildType.Folder,
                  isOpen: true,
                  children: [],
                },
                {
                  id: getUniqueId(),
                  name: "Folder 3",
                  isFav: true,
                  type: ChildType.Folder,
                  isOpen: true,
                  children: [
                    {
                      id: getUniqueId(),
                      name: "Request 1",
                      isFav: true,
                      type: ChildType.Post,
                    },
                    {
                      id: getUniqueId(),
                      name: "Request 1",
                      isFav: true,
                      type: ChildType.Patch,
                    },
                    {
                      id: getUniqueId(),
                      name: "Request 1",
                      isFav: true,
                      type: ChildType.Delete,
                    },
                    {
                      id: getUniqueId(),
                      name: "Request 1",
                      isFav: true,
                      type: ChildType.Head,
                    },
                    {
                      id: getUniqueId(),
                      name: "Request 1",
                      isFav: true,
                      type: ChildType.Options,
                    },
                    {
                      id: getUniqueId(),
                      name: "Folder 2",
                      isFav: true,
                      type: ChildType.Folder,
                      isOpen: true,
                      children: [],
                    },
                    {
                      id: getUniqueId(),
                      name: "Folder 3",
                      isFav: true,
                      type: ChildType.Folder,
                      isOpen: true,
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: getUniqueId(),
              name: "Folder 3",
              isFav: true,
              type: ChildType.Folder,
              isOpen: true,
              children: [],
            },
          ],
        },
        {
          id: getUniqueId(),
          name: "Request 1",
          isFav: true,
          type: ChildType.Post,
        },
        {
          id: getUniqueId(),
          name: "Request 1",
          isFav: true,
          type: ChildType.Patch,
        },
        {
          id: getUniqueId(),
          name: "Request 1",
          isFav: true,
          type: ChildType.Delete,
        },
        {
          id: getUniqueId(),
          name: "Request 1",
          isFav: true,
          type: ChildType.Head,
        },
        {
          id: getUniqueId(),
          name: "Request 1",
          isFav: true,
          type: ChildType.Options,
        },
        {
          id: getUniqueId(),
          name: "Folder 2",
          isFav: true,
          type: ChildType.Folder,
          isOpen: true,
          children: [],
        },
        {
          id: getUniqueId(),
          name: "Folder 3",
          isFav: true,
          type: ChildType.Folder,
          isOpen: true,
          children: [
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: true,
              type: ChildType.Post,
            },
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: true,
              type: ChildType.Patch,
            },
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: true,
              type: ChildType.Delete,
            },
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: true,
              type: ChildType.Head,
            },
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: true,
              type: ChildType.Options,
            },
            {
              id: getUniqueId(),
              name: "Folder 2",
              isFav: true,
              type: ChildType.Folder,
              isOpen: true,
              children: [],
            },
            {
              id: getUniqueId(),
              name: "Folder 3",
              isFav: true,
              type: ChildType.Folder,
              isOpen: true,
              children: [],
            },
          ],
        },
      ],
    },
  ]);

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

  function toggleHierarchy(tree: Tree) {
    updateHierarchy(tree.id, hierarchy, (item) => {
      item.isOpen = !item.isOpen;
      return item;
    });
    setHierarchy([...hierarchy]);
  }

  function onClick(hierarchy: Tree) {
    if (hierarchy.type === ChildType.Folder) {
      toggleHierarchy(hierarchy);
    }
  }

  function renderTree(hierarchy: Tree[], times: number) {
    return hierarchy.map((item, index) => (
      <div className="item" key={index}>
        <div
          className={
            "item-header" + (item.type == ChildType.Folder ? " folder" : "")
          }
          style={{ paddingLeft: times * 2 + 1 + "rem" }}
          onClick={() => onClick(item)}
        >
          {item.type == ChildType.Folder ? (
            <ArrowRightIcon />
          ) : (
            <div className="indent"></div>
          )}
          {getIcon(item.type)}
          <input type="text" disabled value={item.name} />
          <div className="right"></div>
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
      <div>{renderTree(hierarchy, 0)}</div>
    </div>
  );
}
