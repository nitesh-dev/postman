import EditorFooter from "../components/editor/EditorFooter";
import EditorHeader from "../components/editor/EditorHeader";
import EditorLeftSidebar from "../components/editor/EditorLeftSidebar";
import "../styles/editor.css";
import EditorMainArea from "../components/editor/EditorMainArea";
import EditorRightSidebar from "../components/editor/EditorRightSidebar";
import { useContext, useEffect, useRef, useState } from "react";
import { EditorLayoutContext } from "../pages/Editor";


export default function EditorLayout() {
  const centerDiv = useRef<HTMLDivElement>(null);
  const layoutProps = useContext(EditorLayoutContext);

  useEffect(() => {
    onLeftSidebarDrag(300, 0);
  }, []);

  function onLeftSidebarDrag(x: number, _: number) {
    if (!centerDiv.current || !layoutProps) return;

    if (x < layoutProps.current.leftSidebar.minWidth) {
      x = layoutProps.current.leftSidebar.minWidth;
    }

    const maxWidth =
      window.innerWidth -
      (layoutProps.current.mainArea.minWidth +
        layoutProps.current.rightSidebar.width);

    if (x > maxWidth) {
      x = maxWidth;
    }

    layoutProps.current.leftSidebar.width = x;
    centerDiv.current.style.gridTemplateColumns = `${x}px auto ${layoutProps.current.rightSidebar.width}px`;
  }

  function onRightSidebarDrag(x: number, _: number) {
    if (!centerDiv.current || !layoutProps) return;

    let width = window.innerWidth - x;
    if (width < layoutProps.current.rightSidebar.minWidth) {
      width = layoutProps.current.rightSidebar.minWidth;
    }

    const maxWidth =
      window.innerWidth -
      (layoutProps.current.mainArea.minWidth +
        layoutProps.current.leftSidebar.width);

    if (width > maxWidth) {
      width = maxWidth;
    }

    layoutProps.current.rightSidebar.width = width;
    centerDiv.current.style.gridTemplateColumns = `${layoutProps.current.leftSidebar.width}px auto ${width}px`;
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
