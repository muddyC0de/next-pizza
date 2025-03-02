"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useQueryStore } from "@/store/query";

import { ArrowUpDown } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

const sorts = [
  { name: "зростанню ціни", value: "asc" },
  { name: "спадінню ціни", value: "desc" },
];

export const Sort: React.FC<Props> = ({ className }) => {
  const { setSortBy } = useQueryStore((state) => state);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const updateSort = (index: number) => {
    setActiveIndex(index);
    setSortBy(sorts[index].value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 relative bg-gray-50 p-4 rounded-2xl font-semibold",
            className
          )}
        >
          <ArrowUpDown size={16} />
          Сортування по:
          <span className="text-primary">{sorts[activeIndex].name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[293px] py-2 top-1 mt-2 bg-white  rounded-lg shadow-lg">
        {sorts.map((sort, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => updateSort(index)}
            className={cn(
              "cursor-pointer px-4 py-3 hover:bg-[#FFFAF6] w-full font-semibold",
              index === activeIndex && " text-primary"
            )}
          >
            {sort.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
