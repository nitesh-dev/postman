import { createContext, useEffect, useRef } from "react";
import EditorLayout from "../layouts/EditorLayout";

export enum LeftSideBarPanelType {
  none,
  collection,
  environment,
}

export enum RightSideBarPanelType {
  none,
  code,
}

export interface EditorLayoutData {
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
    openedPanel: LeftSideBarPanelType;
  };
  rightSidebar: {
    iconPanelWidth: number;
    width: number;
    minWidth: number;
    openedPanel: RightSideBarPanelType;
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
}

export const EditorLayoutContext = createContext<
  React.MutableRefObject<EditorLayoutData> | undefined
>(undefined);

export default function Editor() {
  const editorLayout = useRef<EditorLayoutData>({
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
      openedPanel: LeftSideBarPanelType.none,
    },
    rightSidebar: {
      iconPanelWidth: 40,
      width: 300,
      minWidth: 200,
      openedPanel: RightSideBarPanelType.none,
    },
    footer: {
      height: 50,
      isHidden: false,
    },
    mainArea: {
      minWidth: 300,
      outputArea: {
        height: 200,
        minHeight: 200,
      },
      requestArea: {
        minHeight: 200,
      },
    },
  });

  useEffect(() => {
    onResize();

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    editorLayout.current.size.width = width;
    editorLayout.current.size.height = height;
  }
  return (
    <EditorLayoutContext.Provider value={editorLayout}>
      <EditorLayout />
    </EditorLayoutContext.Provider>
  );
}
