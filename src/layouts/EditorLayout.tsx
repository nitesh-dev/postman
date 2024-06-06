import EditorFooter from "@/components/editor/EditorFooter";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorLeftSidebar from "@/components/editor/EditorLeftSidebar";
import "@/styles/editor.css";
import EditorMainArea from "@/components/editor/EditorMainArea";
import EditorRightSidebar from "@/components/editor/EditorRightSidebar";
import Split from "react-split";
import IconTabBar from "@/components/editor/IconTabBar";

export default function EditorLayout() {
  return (
    <div className="editor">
      <EditorHeader />
      <div className="editor-area">
        <IconTabBar isRight={false} />
        <Split sizes={[20, 80]} minSize={300} className="split" gutterSize={1}>
          <EditorLeftSidebar />
          <EditorMainArea />
          {/* {false && <EditorRightSidebar />} */}
        </Split>
        <IconTabBar isRight={true} />
      </div>
      <EditorFooter />
    </div>
  );
}
