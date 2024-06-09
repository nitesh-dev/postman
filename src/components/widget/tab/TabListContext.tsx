import { useState, createContext } from "react";
import TabList, { TabListItem } from "./TabList";
import "@/styles/widgets/tab-list.css";

export const TabListContext = createContext<{
  activeTab: string;
}>({
  activeTab: "",
});

export default function TabListContainer({
  children,
  initialActive,
  tabItems,
}: {
  children: React.ReactNode;
  initialActive: string;
  tabItems: TabListItem[];
}) {
  const [activeTab, setActiveTab] = useState(initialActive);
  return (
    <TabListContext.Provider value={{ activeTab }}>
      <div className="tab-list-context">
        <TabList
          onTabChange={(name) => setActiveTab(name)}
          items={tabItems}
          active={activeTab}
        />
        {children}
      </div>
    </TabListContext.Provider>
  );
}
