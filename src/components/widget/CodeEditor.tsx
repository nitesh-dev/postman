import { Editor } from "@monaco-editor/react";
import { useRef } from "react";

export default function CodeEditor() {
  const monacoRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = monaco;
  }
  return (
    <div className="code-editor" style={{ height: 250 }}>
      <Editor
        theme="vs-light"
        defaultLanguage="json"
        defaultValue="// some comment"
        options={{
          minimap: { enabled: false },
          readOnly: false,
          fontSize: 14,
          fontFamily: "Menlo, Monaco, 'Courier New', monospace",
          lineNumbers: "on",
          wordWrap: "off",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          contextmenu: false,
          glyphMargin: false,
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
