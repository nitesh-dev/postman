import "@/styles/editor/request-area.css";
import EditorRequestTab from "../EditorRequestTab";
import BreadCrumb from "./BreadCrumb";
import RequestInputBox from "./RequestInputBox";
import TabList, { TabListItem } from "@/components/widget/tab/TabList";
import TabPanel from "@/components/widget/tab/TabPanel";
import TabListContext from "@/components/widget/tab/TabListContext";
import Table from "@/components/widget/Table";
import { RadioGroupData } from "@/components/widget/radioGroup/RadioGroupTab";
import RadioGroupContainer, {
  RadioGroupContext,
} from "@/components/widget/radioGroup/RadioGroupContext";
import RadioPanel from "@/components/widget/radioGroup/RadioPanel";

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

const bodyItems: RadioGroupData[] = [
  {
    key: "none",
    value: "None",
  },
  {
    key: "form-data",
    value: "Form Data",
  },
  {
    key: "raw",
    value: "Raw",
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
          <TabPanel activeId="headers">
            <Table
              headers={["Key", "Value", "Description"]}
              tableData={tableData}
            />
          </TabPanel>
          <TabPanel activeId="body">
            <RadioGroupContainer initialActive="none" radioItems={bodyItems}>
              <RadioPanel activeId="none">No data to pass</RadioPanel>
              <RadioPanel activeId="form-data">form</RadioPanel>
              <RadioPanel activeId="raw">body</RadioPanel>
            </RadioGroupContainer>
          </TabPanel>
        </TabListContext>
      </div>
    </div>
  );
}
