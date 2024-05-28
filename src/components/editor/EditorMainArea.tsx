import { useContext, useEffect, useRef } from "react";
import EditorOutputArea from "./EditorOutputArea";
import EditorRequestArea from "./EditorRequestArea";
import { EditorLayoutContext } from "../../pages/Editor";


export default function EditorMainArea() {
  const layoutProps = useContext(EditorLayoutContext);
  const centerDiv = useRef<HTMLDivElement>(null);

  function onDrag(_: number, y: number) {
    if (!centerDiv.current || !layoutProps) return;

    const totalHeight = centerDiv.current.clientHeight;
    y = totalHeight - y + centerDiv.current.offsetTop;

    if (y < layoutProps.current.mainArea.outputArea.minHeight) {
      y = layoutProps.current.mainArea.outputArea.minHeight;
    }

    const maxHeight =
      totalHeight -
      (layoutProps.current.mainArea.outputArea.minHeight +
        layoutProps.current.mainArea.requestArea.minHeight);

    if (y > maxHeight) {
      y = maxHeight;
    }

    layoutProps.current.mainArea.outputArea.height = y;
    centerDiv.current.style.gridTemplateRows = `auto ${layoutProps.current.mainArea.outputArea.height}px`;
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
