'use client';

import { EQUIPMENT_OPTIONS } from '@/lib/constants/equipment';

interface EquipmentSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function EquipmentSelector({ selected, onChange }: EquipmentSelectorProps) {
  const toggle = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((s) => s !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {EQUIPMENT_OPTIONS.map((item) => {
        const isSelected = selected.includes(item);
        return (
          <button
            key={item}
            onClick={() => toggle(item)}
            className={`
              px-3 py-1.5 rounded-lg text-sm transition-colors border cursor-pointer
              ${isSelected
                ? 'border-gold/50 bg-gold/10 text-gold'
                : 'border-border-default bg-bg-secondary text-text-muted hover:text-text-primary hover:border-text-dim'
              }
            `}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
