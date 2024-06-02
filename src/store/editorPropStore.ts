import { create } from "zustand";

export enum PanelType {
  none,
  collection,
  environment,
  code,
}

export const useEditorPropStore = create<{
  leftSidebar: {
    openedPanel: PanelType;
  };
  rightSidebar: {
    openedPanel: PanelType;
  };
  footer: {
    isHidden: boolean;
  };
  setOpenedLeftSidebarPanel(panel: PanelType): void;
  setOpenedRightSidebarPanel(panel: PanelType): void;
}>((set) => ({
  leftSidebar: {
    openedPanel: PanelType.collection,
  },
  rightSidebar: {
    openedPanel: PanelType.none,
  },
  footer: {
    isHidden: false,
  },

  setOpenedLeftSidebarPanel: (panel) =>
    set((state) => ({
      leftSidebar: {
        ...state.leftSidebar,
        openedPanel: panel,
      },
    })),

  setOpenedRightSidebarPanel: (panel) =>
    set((state) => ({
      rightSidebar: {
        ...state.rightSidebar,
        openedPanel: panel,
      },
    })),
}));
