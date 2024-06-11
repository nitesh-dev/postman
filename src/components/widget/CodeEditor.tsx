import { Editor } from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <div className="code-editor" style={{ height: 200 }}>
      <Editor
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </div>
  );
}
