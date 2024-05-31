import { createContext, useEffect, useRef } from "react";
import EditorLayout from "../layouts/EditorLayout";
import { useEditorPropStore } from "../store/editorPropStore";
import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";

export default function Editor() {
  const [setSize] = useEditorPropStore(useShallow((state) => [state.setSize]));

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
    setSize(width, height);
  }
  return <EditorLayout />;
}
