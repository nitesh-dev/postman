import { useContext, useEffect, useRef } from "react";
import EditorOutputArea from "./EditorOutputArea";
import EditorRequestArea from "./EditorRequestArea";
import { useEditorPropStore } from "../../store/editorPropStore";
import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";

export default function EditorMainArea() {
  const [
    outputAreaHeight,
    outputAreaMinHeight,
    requestAreaMinHeight,
    setOutputAreaHeight,
  ] = useEditorPropStore(
    useShallow((state) => [
      state.mainArea.outputArea.height,
      state.mainArea.outputArea.minHeight,
      state.mainArea.requestArea.minHeight,
      state.setOutputAreaHeight,
    ])
  );

  const centerDiv = useRef<HTMLDivElement>(null);

  function onDrag(_: number, y: number) {
    if (!centerDiv.current) return;

    const totalHeight = centerDiv.current.clientHeight;
    y = totalHeight - y + centerDiv.current.offsetTop;

    if (y < outputAreaMinHeight) {
      y = outputAreaMinHeight;
    }

    const maxHeight =
      totalHeight - (outputAreaMinHeight + requestAreaMinHeight);

    if (y > maxHeight) {
      y = maxHeight;
    }

    setOutputAreaHeight(y);
    centerDiv.current.style.gridTemplateRows = `auto ${outputAreaHeight}px`;
  }

  useEffect(() => {
    onDrag(0, 10000);
  }, []);

  return (
    <div ref={centerDiv} className="editor-main">
      <EditorRequestArea />
      <EditorOutputArea onDrag={onDrag} />
    </div>
  );
}
