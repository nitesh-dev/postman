import "@/styles/editor/request-area.css";
import EditorRequestTab, { EditorRequestTabProps } from "../EditorRequestTab";
import BreadCrumb from "./BreadCrumb";
import RequestInputBox from "./RequestInputBox";
import TabList, { TabListItem } from "@/components/widget/tab/TabList";
import TabPanel from "@/components/widget/tab/TabPanel";
import Table from "@/components/widget/Table";
import { RadioGroupData } from "@/components/widget/radioGroup/RadioGroupTab";
import RadioGroupContainer, {
  RadioGroupContext,
} from "@/components/widget/radioGroup/RadioGroupContext";
import RadioPanel from "@/components/widget/radioGroup/RadioPanel";
import CodeEditor from "@/components/widget/CodeEditor";
import TabListContainer from "@/components/widget/tab/TabListContext";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useShallow } from "zustand/react/shallow";
import { Tree, TreeCollection } from "../RequestHierarchy";
import { useMemo } from "react";

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
  const [activeTab, openedTabs, collections, setActiveTab, removeOpenedTab] =
    useWorkspaceStore(
      useShallow((state) => [
        state.local.activeTab,
        state.local.openedTabs,
        state.local.collections,
        state.setActiveTab,
        state.removeOpenedTab,
      ])
    );

  const editorTabData = useMemo(() => {
    return treeToEditorRequestTabProps(collections, openedTabs);
  }, [collections, openedTabs, activeTab]);

  function treeToEditorRequestTabProps(
    tree: TreeCollection[] | Tree[],
    openedTabs: string[],
    tabs: EditorRequestTabProps[] = []
  ) {
    // find all tabs recursively
    for (const child of tree) {
      if (openedTabs.includes(child.id)) {
        tabs.push({
          id: child.id,
          name: child.name,
          type: child.type,
          isSaved: false,
        });
      } else {
        treeToEditorRequestTabProps(child.children || [], openedTabs, tabs);
      }
    }

    return tabs;
  }
  return (
    <div className="editor-request-area">
      <EditorRequestTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        items={editorTabData}
        onTabClose={() => {
          removeOpenedTab(activeTab);
        }}
      />
      <BreadCrumb path="dummy/nitesh/auth-request" />

      <div className="request-content-area">
        <RequestInputBox />
        <TabListContainer initialActive="params" tabItems={requestTabItems}>
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
              <RadioPanel activeId="form-data">
                <Table
                  headers={["Key", "Value", "Description"]}
                  tableData={tableData}
                />
              </RadioPanel>
              <RadioPanel activeId="raw">
                <CodeEditor />
              </RadioPanel>
            </RadioGroupContainer>
          </TabPanel>
        </TabListContainer>
      </div>
    </div>
  );
}
