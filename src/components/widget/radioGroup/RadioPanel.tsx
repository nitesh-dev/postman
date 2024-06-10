import { useContext } from "react";
import { RadioGroupContext } from "./RadioGroupContext";

export default function RadioPanel({
  children,
  activeId,
}: {
  children: React.ReactNode;
  activeId: string;
}) {
  const { activeTab } = useContext(RadioGroupContext);
  return activeTab === activeId || !activeId ? <div className="tab-panel">{children}</div> : null;
}
