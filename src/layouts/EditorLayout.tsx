import EditorFooter from "../components/editor/EditorFooter";
import EditorHeader from "../components/editor/EditorHeader";
import EditorLeftSidebar from "../components/editor/EditorLeftSidebar";
import "../styles/editor.css";
import EditorMainArea from "../components/editor/EditorMainArea";
import EditorRightSidebar from "../components/editor/EditorRightSidebar";
import { useEffect, useRef, useState } from "react";

interface LayoutProps {
  leftSidebarWidth: number;
  leftSidebarMinWidth: number;
  rightSidebarWidth: number;
  rightSidebarMinWidth: number;
  centerMinWidth: number;
}

export default function EditorLayout() {
  const centerDiv = useRef<HTMLDivElement>(null);

  const layoutProps = useRef<LayoutProps>({
    leftSidebarWidth: 250,
    leftSidebarMinWidth: 300,
    rightSidebarWidth: 250,
    rightSidebarMinWidth: 200,
    centerMinWidth: 500,
  });

  useEffect(() => {
    onLeftSidebarDrag(300, 0);
  }, []);

  function onLeftSidebarDrag(x: number, _: number) {
    if (!centerDiv.current) return;
    if (x < layoutProps.current.leftSidebarMinWidth) {
      x = layoutProps.current.leftSidebarMinWidth;
    }

    const maxWidth =
      window.innerWidth -
      (layoutProps.current.centerMinWidth +
        layoutProps.current.rightSidebarWidth);

    if (x > maxWidth) {
      x = maxWidth;
    }

    layoutProps.current.leftSidebarWidth = x;
    centerDiv.current.style.gridTemplateColumns = `${x}px auto ${layoutProps.current.rightSidebarWidth}px`;
  }

  function onRightSidebarDrag(x: number, _: number) {
    if (!centerDiv.current) return;

    let width = window.innerWidth - x;
    if (width < layoutProps.current.rightSidebarMinWidth) {
      width = layoutProps.current.rightSidebarMinWidth;
    }

    const maxWidth =
      window.innerWidth -
      (layoutProps.current.centerMinWidth +
        layoutProps.current.leftSidebarWidth);

    if (width > maxWidth) {
      width = maxWidth;
    }

    layoutProps.current.rightSidebarWidth = width;
    centerDiv.current.style.gridTemplateColumns = `${layoutProps.current.leftSidebarWidth}px auto ${width}px`;
  }

  return (
    <div className="editor">
      <EditorHeader />
      <div className="center-area" ref={centerDiv}>
        <EditorLeftSidebar onDrag={onLeftSidebarDrag} />
        <EditorMainArea />
        <EditorRightSidebar onDrag={onRightSidebarDrag} />
      </div>
      <EditorFooter />
    </div>
  );
}
