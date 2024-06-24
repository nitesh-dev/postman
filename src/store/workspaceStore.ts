import { EditorRequestTabProps } from "@/components/editor/EditorRequestTab";
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
    activeTab: string;
  };
  global: WorkspaceState;
};

type Actions = {
  addFolder(folderId: string): string;
  toggleFolder(folderId: string): void;
  addRequest(folderId: string): string;
  duplicateItem(itemId: string): void;
  renameItem(itemId: string, newName: string): void;
  deleteItem(itemId: string): void;
  addOpenedTab(tabId: string): void;
  removeOpenedTab(tabId: string): void;
  setActiveTab(tabId: string): void;
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
          children: [
            {
              id: getUniqueId(),
              name: "Request 1",
              isFav: false,
              type: 2,
            },
            {
              id: getUniqueId(),
              name: "Request 2",
              isFav: false,
              type: 3,
            },
          ],
          isOpen: true,
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
      activeTab: "",
    },
    global: {
      collections: [],
      environments: [],
      id: getUniqueId(),
      name: "",
      createdAt: 0,
      globalEnvironment: {
        createdAt: 0,
        id: getUniqueId(),
        name: "",
        variables: [],
      },
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

    addOpenedTab: (tabId) => {
      set((state) => {
        // if tab already opened
        if (state.local.openedTabs.includes(tabId)) {
          state.local.activeTab = tabId;
        } else {
          state.local.activeTab = tabId;
          state.local.openedTabs.push(tabId);
        }
      });
    },
    removeOpenedTab: (tabId) => {
      set((state) => {
        state.local.openedTabs = state.local.openedTabs.filter(
          (id) => id !== tabId
        );
      });
    },

    setActiveTab: (tabId) => {
      set((state) => {
        state.local.activeTab = tabId;
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

export type Item = {
  id: string;
  createdAt: number;
};
// export type User = Item & {
//   name: string;
//   email: string;
//   password: string;
//   picUrl: string;
// };

export type WorkspaceState = Item & {
  name: string;
  collections: Collection[];
  environments: Environment[];
  globalEnvironment: Environment;
};
export type Collection = Item & {
  name: string;
  description: string;
  items: CollectionItem[];
};

export type CollectionItemType = "request" | "folder";
export type CollectionBaseItem = Item & {
  type: CollectionItemType;
  name: string;
  description: string;
};
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type Body = {
  type: "raw" | "form-data" | "urlencoded" | "file";
  data: any;
};
export type RequestItem = CollectionBaseItem & {
  url: string;
  method: HttpMethod;
  body: Body;
  headers: { [key: string]: string };
};
export type FolderItem = CollectionBaseItem & {
  items: CollectionItem[];
};

export type CollectionItem = RequestItem | FolderItem;

//-------environment-------

export type Environment = Item & {
  name: string;
  variables: EnvironmentVariable[];
};
export type EnvironmentVariable = Omit<Item, "createdAt"> & {
  key: string;
  value: string;
};
