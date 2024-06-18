import {
  ChildType,
  Tree,
  TreeCollection,
} from "@/components/editor/RequestHierarchy";
import { getUniqueId } from "@/extra/utils";
import { WritableDraft } from "immer";
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
  duplicateItem(itemId: string): void;
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
          name: "My Collection3",
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
    duplicateItem: (itemId) => {
      set((state) => {
        let { parent, childIndex } = findParentTreeItem(
          state.local.collections,
          itemId
        );

        if (childIndex === -1) return;

        if (parent) {
          let child = parent.children!![childIndex];
          let duplicate = duplicateItem(child);

          parent.children!!.push(duplicate as Tree);
          parent.isOpen = true;
        } else {
          // duplicate the collection
          let child = state.local.collections[childIndex];
          let duplicate = duplicateItem(child);
          duplicate.isOpen = true;
          state.local.collections.push(duplicate as TreeCollection);
        }
      });
    },

    deleteItem: (itemId) => {
      set((state) => {
        let { parent, childIndex } = findParentTreeItem(
          state.local.collections,
          itemId
        );

        if (childIndex === -1) return;

        if (parent) {
          parent.children!!.splice(childIndex, 1);
        } else {
          let collections = state.local.collections;
          collections.splice(childIndex, 1);
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

function duplicateItem(item: Tree | TreeCollection): Tree | TreeCollection {
  let duplicate = { ...item, id: getUniqueId() };

  if (item.children) {
    duplicate.children = item.children.map((child) =>
      duplicateItem(child)
    ) as typeof item.children;
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
): {
  parent: Tree | TreeCollection | null;
  childIndex: number;
} {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.id === id)
      return {
        parent: parent,
        childIndex: i,
      };
    let _parent = item;
    const foundItem = findParentTreeItem(_parent.children || [], id, _parent);
    if (foundItem.parent && foundItem.childIndex != -1) return foundItem;
  }
  return { parent: null, childIndex: -1 };
}
