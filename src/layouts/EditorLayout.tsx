import EditorFooter from "../components/editor/EditorFooter";
import EditorHeader from "../components/editor/EditorHeader";
import EditorLeftSidebar from "../components/editor/EditorLeftSidebar";
import "../styles/editor.css";
import EditorMainArea from "../components/editor/EditorMainArea";
import EditorRightSidebar from "../components/editor/EditorRightSidebar";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useEditorPropStore } from "../store/editorPropStore";
import { useShallow } from "zustand/react/shallow";

export default function EditorLayout() {
  const [
    leftSidebarMinWidth,
    rightSidebarMinWidth,
    mainAreaMinWidth,
    setLeftSidebarWidth,
    setRightSidebarWidth,
  ] = useEditorPropStore(
    useShallow((state) => [
      state.leftSidebar.minWidth,
      state.rightSidebar.minWidth,
      state.mainArea.minWidth,
      state.setLeftSidebarWidth,
      state.setRightSidebarWidth,
    ])
  );
  const centerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onLeftSidebarDrag(300, 0);
  }, []);

  function onLeftSidebarDrag(x: number, _: number) {
    if (!centerDiv.current) return;

    if (x < leftSidebarMinWidth) {
      x = leftSidebarMinWidth;
    }
    const rightSidebarWidth = useEditorPropStore.getState().rightSidebar.width;

    const maxWidth = window.innerWidth - (mainAreaMinWidth + rightSidebarWidth);

    if (x > maxWidth) {
      x = maxWidth;
    }

    setLeftSidebarWidth(x);

    centerDiv.current.style.gridTemplateColumns = `${x}px auto ${rightSidebarWidth}px`;
  }

  function onRightSidebarDrag(x: number, _: number) {
    if (!centerDiv.current) return;

    let width = window.innerWidth - x;
    if (width < rightSidebarMinWidth) {
      width = rightSidebarMinWidth;
    }

    const leftSidebarWidth = useEditorPropStore.getState().leftSidebar.width;

    const maxWidth = window.innerWidth - (mainAreaMinWidth + leftSidebarWidth);

    if (width > maxWidth) {
      width = maxWidth;
    }

    setRightSidebarWidth(width);
    centerDiv.current.style.gridTemplateColumns = `${leftSidebarWidth}px auto ${width}px`;
  }

  return (
    <div className="editor">
      <EditorHeader />
      <div
        className="center-area"
        ref={centerDiv}
        // style={{ gridTemplateColumns: `${x}px auto ${rightSidebarWidth}px` }}
      >
        <EditorLeftSidebar onDrag={onLeftSidebarDrag} />
        <EditorMainArea />
        <EditorRightSidebar onDrag={onRightSidebarDrag} />
      </div>
      <EditorFooter />
    </div>
  );
}
