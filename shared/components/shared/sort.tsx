import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

const sorts = ["рейтингу"];
const activeIndex = 0;

export const Sort: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl font-semibold",
        className
      )}
    >
      <button className="px-5 h-11 flex items-center gap-2">
        <ArrowUpDown size={16} />
        Сортування по:
        <span className="text-primary">{sorts[activeIndex]}</span>
      </button>
    </div>
  );
};
