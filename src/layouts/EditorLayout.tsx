import EditorFooter from "../components/editor/EditorFooter";
import EditorHeader from "../components/editor/EditorHeader";
import EditorLeftSidebar from "../components/editor/EditorLeftSidebar";
import "../styles/editor.css";
import EditorMainArea from "../components/editor/EditorMainArea";
import EditorRightSidebar from "../components/editor/EditorRightSidebar";

export default function EditorLayout() {
  return (
    <div className="editor">
      <EditorHeader />
      <div className="center-area">
        <EditorLeftSidebar />
        <EditorMainArea />
        <EditorRightSidebar />
      </div>
      <EditorFooter />
    </div>
  );
}
