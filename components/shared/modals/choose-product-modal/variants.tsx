"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Variant = {
  name: string;
  value: number;
  disabled?: boolean;
};

interface Props {
  className?: string;
  onChange: (value: Variant["value"]) => void;
  selectedValue: Variant["value"];
  items: Variant[];
}

export const Variants: React.FC<Props> = ({
  items,
  onChange,
  selectedValue,
}) => {
  const handleChangeVariant = (value: number) => {
    onChange(value);
  };

  return (
    <div className="flex bg-[#ECECEC] p-[2px] rounded-full justify-between">
      {items.map((option, index) => (
        <button
          onClick={() => handleChangeVariant(option.value)}
          className={cn(
            "flex items-center font-medium justify-center cursor-pointer h-[30px] px-2 flex-1 rounded-3xl transition-all  duration-400 text-sm",
            option.value === selectedValue && "bg-white",
            option.disabled && "text-gray-500 opacity-50 pointer-events-none"
          )}
          key={index}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};
