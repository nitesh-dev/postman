import { useState, createContext, useEffect } from "react";
import "@/styles/widgets/radio-group.css";
import RadioGroupTab, { RadioGroupData } from "./RadioGroupTab";

export const RadioGroupContext = createContext<{
  activeTab: string;
}>({
  activeTab: "",
});

export default function RadioGroupContainer({
  children,
  initialActive,
  radioItems,
}: {
  children: React.ReactNode;
  initialActive: string;
  radioItems: RadioGroupData[];
}) {
  const [activeTab, setActiveTab] = useState(initialActive);


  useEffect(() => {

    console.log("activeTab", activeTab)
  }, [activeTab]);
  return (
    <RadioGroupContext.Provider value={{ activeTab }}>
      <div className="radio-group-context">
        <RadioGroupTab
          onTabChange={(name) => setActiveTab(name)}
          items={radioItems}
          active={activeTab}
        />
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}
