export interface RadioGroupData {
  key: string;
  value: string;
}
export default function RadioGroupTab({
  items,
  active,
  onTabChange,
}: {
  items: RadioGroupData[];
  active: string;
  onTabChange: (value: string) => void;
}) {
  return (
    <form className="radio-group">
      {items.map((item, index) => (
        <div key={index} className="radio-item">
          <input
            onClick={() => onTabChange(item.key)}
            type="radio"
            name="radio-input"
            value={item.value}
          />
          <label>{item.value}</label>
        </div>
      ))}
    </form>
  );
}
