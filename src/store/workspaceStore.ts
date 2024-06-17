import {
  ChildType,
  Tree,
  TreeCollection,
} from "@/components/editor/RequestHierarchy";
import { getUniqueId } from "@/extra/utils";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  local: {
    collections: TreeCollection[];
    environment: {};
    openedTabs: string[];
  };
  global: {
    environment: {};
    members: {};
    workspaces: {};
  };
};

type Actions = {
  addFolder(folderId: string): string;
  toggleFolder(folderId: string): void;
  // addRequest(folderId: string): string;
  // duplicateFolder(folderId: string): void;
  // renameFolder(folderId: string, name: string): void;
  // deleteFolder(folderId: string): void;
};

// export const useCountStore = create<State & Actions>()(
//   immer((set) => ({
//     count: 0,
//     increment: (qty: number) =>
//       set((state) => {
//         state.count += qty
//       }),
//     decrement: (qty: number) =>
//       set((state) => {
//         state.count -= qty
//       }),
//   })),
// )

export const useWorkspaceStore = create<State & Actions>()(
  immer((set) => ({
    local: {
      collections: [
        {
          id: getUniqueId(),
          name: "My Collection",
          type: 0,
          children: [],
          isOpen: false,
        },
        {
          id: getUniqueId(),
          name: "My Collection2",
          type: 0,
          children: [],
          isOpen: false,
        },
        {
          id: getUniqueId(),
          name: "My Collection2",
          type: 0,
          children: [],
          isOpen: false,
        },
      ],
      environment: {},
      openedTabs: [],
    },
    global: {
      environment: {},
      members: {},
      workspaces: {},
    },

    addFolder: (folderId) => {
      let child: Tree = {
        id: getUniqueId(),
        name: "Untitled Folder",
        isFav: false,
        type: ChildType.Folder,
        children: [],
      };

      set((state) => {
        let treeItem = findTreeItem(state.local.collections, folderId);
        if (treeItem && treeItem.children) {
          treeItem.children.push(child);
          treeItem.isOpen = true;
        }
      });
      return child.id;
    },

    toggleFolder: (folderId) => {
      set((state) => {
        let treeItem = findTreeItem(state.local.collections, folderId);
        if (treeItem) {
          treeItem.isOpen = !treeItem.isOpen;
        }
      });
    },
  }))
);

function findTreeItem(
  items: Tree[] | TreeCollection[],
  id: string
): Tree | TreeCollection | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    const foundItem = findTreeItem(item.children || [], id);
    if (foundItem) return foundItem;
  }
  return undefined;
}
