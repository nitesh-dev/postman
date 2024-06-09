import { useContext } from "react";
import { TabListContext } from "./TabListContext";

export default function TabPanel({
  children,
  activeId,
}: {
  children: React.ReactNode;
  activeId: string;
}) {
  const { activeTab } = useContext(TabListContext);
  return activeTab === activeId || !activeId ? <div className="tab-panel">{children}</div> : null;
}
