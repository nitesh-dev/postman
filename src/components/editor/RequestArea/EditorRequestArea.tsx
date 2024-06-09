import "@/styles/editor/request-area.css";
import EditorRequestTab from "../EditorRequestTab";
import BreadCrumb from "./BreadCrumb";
import RequestInputBox from "./RequestInputBox";
import TabList, { TabListItem } from "@/components/widget/tab/TabList";
import TabPanel from "@/components/widget/tab/TabPanel";
import TabListContext from "@/components/widget/tab/TabListContext";
import Table from "@/components/widget/Table";

const requestTabItems: TabListItem[] = [
  {
    name: "Overview",
    value: "overview",
  },
  {
    name: "Params",
    value: "params",
    isChanges: true,
  },
  {
    name: "Authorization",
    value: "authorization",
  },
  {
    name: "Headers",
    value: "headers",
  },
  {
    name: "Body",
    value: "body",
  },
];

const tableData = [
  ["name", "Nitesh", "This is the name of the user"],
  ["age", "23", "This is the age of the user"],
];

export default function EditorRequestArea() {
  return (
    <div className="editor-request-area">
      <EditorRequestTab />
      <BreadCrumb path="dummy/nitesh/auth-request" />

      <div className="request-content-area">
        <RequestInputBox />
        <TabListContext initialActive="params" tabItems={requestTabItems}>
          <TabPanel activeId="params">
            <Table
              headers={["Key", "Value", "Description"]}
              tableData={tableData}
            />
          </TabPanel>
          <TabPanel activeId="authorization">Hello tab panel 2</TabPanel>
          <TabPanel activeId="headers">Hello tab panel 3</TabPanel>
          <TabPanel activeId="body">Hello tab panel 4</TabPanel>
        </TabListContext>
      </div>
    </div>
  );
}
