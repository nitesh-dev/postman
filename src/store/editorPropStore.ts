import { create } from "zustand";

export enum PanelType {
  none,
  collection,
  environment,
  code,
}

export const useEditorPropStore = create<{
  size: {
    width: number;
    height: number;
  };
  header: {
    height: number;
  };
  leftSidebar: {
    iconPanelWidth: number;
    width: number;
    minWidth: number;
    openedPanel: PanelType;
  };
  rightSidebar: {
    iconPanelWidth: number;
    width: number;
    minWidth: number;
    openedPanel: PanelType;
  };
  footer: {
    height: number;
    isHidden: boolean;
  };
  mainArea: {
    minWidth: number;
    outputArea: {
      height: number;
      minHeight: number;
    };
    requestArea: {
      minHeight: number;
    };
  };

  setSize(width: number, height: number): void;
  setLeftSidebarWidth(width: number): void;
  setRightSidebarWidth(width: number): void;
  setOutputAreaHeight(height: number): void;
  setOpenedLeftSidebarPanel(panel: PanelType): void;
  setOpenedRightSidebarPanel(panel: PanelType): void;
}>((set) => ({

  size: {
    width: 0,
    height: 0,
  },
  header: {
    height: 40,
  },
  leftSidebar: {
    iconPanelWidth: 50,
    width: 300,
    minWidth: 300,
    openedPanel: PanelType.none,
  },
  rightSidebar: {
    iconPanelWidth: 40,
    width: 300,
    minWidth: 300,
    openedPanel: PanelType.none,
  },
  footer: {
    height: 40,
    isHidden: false,
  },
  mainArea: {
    minWidth: 300,
    outputArea: {
      height: 300,
      minHeight: 300,
    },
    requestArea: {
      minHeight: 300,
    },
  },

  setSize: (width, height) => set(() => ({ size: { width, height } })),

  setLeftSidebarWidth: (width) =>
    set((state) => {
      console.log(width)
      return { leftSidebar: { ...state.leftSidebar, width } }
    }),

  setRightSidebarWidth: (width) =>
    set((state) => ({ rightSidebar: { ...state.rightSidebar, width } })),

  setOutputAreaHeight: (height) =>
    set((state) => ({
      mainArea: {
        ...state.mainArea,
        outputArea: { ...state.mainArea.outputArea, height },
      },
    })),

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
