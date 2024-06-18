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
  addRequest(folderId: string): string;
  duplicateFolder(folderId: string): void;
  renameItem(itemId: string, newName: string): void;
  deleteItem(itemId: string): void;
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

    addRequest: (folderId) => {
      let child: Tree = {
        id: getUniqueId(),
        name: "Untitled Request",
        isFav: false,
        type: ChildType.Get,
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

    // TODO fix duplicate folder later
    duplicateFolder: (folderId) => {
      set((state) => {
        let parentItem = findParentTreeItem(state.local.collections, folderId);
        if (parentItem && parentItem.children) {
          // duplicate the folder
          let duplicate = duplicateFolder(parentItem);
          parentItem.children.push(duplicate as Tree);
          parentItem.isOpen = true;
        } else {
          let collectionItem = findTreeItem(state.local.collections, folderId);

          if (collectionItem) {
            // duplicate the collection
            let duplicate = duplicateFolder(collectionItem);
            state.local.collections.push(duplicate as TreeCollection);
            collectionItem.isOpen = true;
          }
        }
      });
    },

    deleteItem: (itemId) => {
      set((state) => {
        let treeItem = findTreeItem(state.local.collections, itemId);
        if (treeItem) {
          treeItem.isOpen = !treeItem.isOpen;
        }
      });
    },

    renameItem: (itemId, newName) => {
      set((state) => {
        let treeItem = findTreeItem(state.local.collections, itemId);
        if (treeItem) {
          treeItem.name = newName;
        }
      });
    },
  }))
);

function duplicateFolder(item: Tree | TreeCollection): Tree | TreeCollection {
  let duplicate = structuredClone(item);
  duplicate.id = getUniqueId();

  if (duplicate.children) {
    for (const child of duplicate.children) {
      duplicateFolder(child);
    }
  }

  return duplicate;
}

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

function findParentTreeItem(
  items: Tree[] | TreeCollection[],
  id: string,
  parent: Tree | TreeCollection | null = null
): Tree | TreeCollection | null {
  for (const item of items) {
    if (item.id === id) return parent;
    parent = item;
    const foundItem = findParentTreeItem(parent.children || [], id, parent);
    if (foundItem) return foundItem;
  }
  return null;
}
