import { useEffect, useState } from "react";
import "@/styles/widgets/dropdown.css";

export default function Dropdown({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (item: string) => void;
}) {
  function onItemSelect(item: string) {
    onSelect(item);
  }

  return (
    <div className="dropdown">
      {items.map((item, index) => (
        <div
          key={index}
          className="dropdown-item"
          onClick={() => onItemSelect(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
