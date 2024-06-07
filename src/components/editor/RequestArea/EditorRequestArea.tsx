import "@/styles/editor/request-area.css";
import EditorRequestTab from "../EditorRequestTab";
import BreadCrumb from "./BreadCrumb";
import RequestInputBox from "./RequestInputBox";
import TabList from "@/components/widget/tab/TabList";
import TabPanel from "@/components/widget/tab/TabPanel";

export default function EditorRequestArea() {
  return (
    <div className="editor-request-area">
      <EditorRequestTab />
      <BreadCrumb path="dummy/nitesh/auth-request" />

      <div className="request-content-area">
        <RequestInputBox />
        <TabList />
        <TabPanel>Hello tab panel</TabPanel>
        <p>hello request content</p>
      </div>
    </div>
  );
}
