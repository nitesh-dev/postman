import { useEffect, useRef } from "react";
import EditorOutputArea from "./EditorOutputArea";
import EditorRequestArea from "./EditorRequestArea";

interface LayoutProps {
  outputAreaHeight: number;
  outputAreaMinHeight: number;
  requestAreaMinHeight: number;
}

export default function EditorMainArea() {
  const centerDiv = useRef<HTMLDivElement>(null);
  const layoutProps = useRef<LayoutProps>({
    outputAreaHeight: 250,
    outputAreaMinHeight: 200,
    requestAreaMinHeight: 200,
  });

  function onDrag(_: number, y: number) {
    if (!centerDiv.current) return;

    const totalHeight = centerDiv.current.clientHeight;
    y = totalHeight - y + centerDiv.current.offsetTop;

    if (y < layoutProps.current.outputAreaMinHeight) {
      y = layoutProps.current.outputAreaMinHeight;
    }

    const maxHeight =
      totalHeight -
      (layoutProps.current.outputAreaMinHeight +
        layoutProps.current.requestAreaMinHeight);

    if (y > maxHeight) {
      y = maxHeight;
    }

    layoutProps.current.outputAreaHeight = y;
    centerDiv.current.style.gridTemplateRows = `auto ${layoutProps.current.outputAreaHeight}px`;
  }


  useEffect(() => {
    onDrag(0, 10000);
  }, [])

  return (
    <div ref={centerDiv} className="editor-main">
      <EditorRequestArea />
      <EditorOutputArea onDrag={onDrag} />
    </div>
  );
}
