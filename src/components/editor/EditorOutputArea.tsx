import "@/styles/editor/output-area.css";

import TabPanel from "../widget/tab/TabPanel";
import { TabListItem } from "../widget/tab/TabList";
import TabListContainer from "../widget/tab/TabListContext";
import Table from "../widget/Table";
import CodeEditor from "../widget/CodeEditor";

const footerTabItems: TabListItem[] = [
  {
    name: "Body",
    value: "body",
  },
  {
    name: "Headers",
    value: "headers",
  },
  {
    name: "Cookies",
    value: "cookies",
  },
];

const tableData = [
  ["name", "Nitesh"],
  ["age", "23"],
];

export default function EditorOutputArea() {
  return (
    <div className="editor-output-area">
      <div className="inner">
        <div className="status-bar">
          <div className="status-item">
            Status: <span className="success">200 Ok</span>
          </div>
          <div className="status-item">
            Time: <span className="success">853 ms</span>
          </div>
          <div className="status-item">
            Size: <span className="error">291 B</span>
          </div>
        </div>

        <TabListContainer initialActive="headers" tabItems={footerTabItems}>
          <TabPanel activeId="body">
            <CodeEditor />
          </TabPanel>
          <TabPanel activeId="headers">
            <Table headers={["Key", "Value"]} tableData={tableData}></Table>
          </TabPanel>
          <TabPanel activeId="cookies">Under development</TabPanel>
        </TabListContainer>
      </div>
    </div>
  );
}
