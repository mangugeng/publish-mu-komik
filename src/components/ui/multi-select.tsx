import React from "react";

export type MultiSelectOption = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ options, value, onChange, placeholder }, ref) => {
    const handleToggle = (val: string) => {
      if (value.includes(val)) {
        onChange(value.filter(v => v !== val));
      } else {
        onChange([...value, val]);
      }
    };

    return (
      <div ref={ref} className="border rounded p-2 bg-white">
        {options.length === 0 && (
          <div className="text-muted-foreground text-sm">{placeholder || "Tidak ada opsi"}</div>
        )}
        {options.map(opt => {
          const inputId = `multi-select-${opt.value}`;
          return (
            <label key={opt.value} htmlFor={inputId} className="flex items-center gap-2 cursor-pointer mb-1">
              <input
                id={inputId}
                name={inputId}
                type="checkbox"
                checked={value.includes(opt.value)}
                onChange={() => handleToggle(opt.value)}
                className="accent-primary"
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          );
        })}
      </div>
    );
  }
);
MultiSelect.displayName = "MultiSelect"; 