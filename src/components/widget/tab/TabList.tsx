

export interface TabListItem {
  name: string;
  value: string;
  isChanges?: boolean;
}

export default function TabList({
  items,
  active,
  onTabChange,
}: {
  items: TabListItem[];
  active: string;
  onTabChange: (value: string) => void;
}) {

  return (
    <div className="tab-list">
      {items.map((item, index) => (
        <div
          onClick={() => onTabChange(item.value)}
          data-value={item.value}
          key={index}
          className={
            (item.isChanges ? "changes" : "") +
            (item.value === active ? " active" : "")
          }
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
