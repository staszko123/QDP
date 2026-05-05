interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  items: TabItem[];
  activeValue: string;
  onChange?: (value: string) => void;
}

export function Tabs({ activeValue, items, onChange }: TabsProps) {
  return (
    <div className="qd-tabs" role="tablist" aria-label="Section tabs">
      {items.map((item) => (
        <button
          aria-selected={item.value === activeValue}
          className="qd-tab"
          key={item.value}
          onClick={() => onChange?.(item.value)}
          role="tab"
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
