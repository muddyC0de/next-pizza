"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  categories: Category[];
}

export const CategoriesMobile: React.FC<Props> = ({
  categories,
  className,
}) => {
  const activeId = useCategoryStore((state) => state.activeId);
  const setActiveId = useCategoryStore((state) => state.setActiveId);

  const handleClick = (id: number) => {
    setActiveId(id);
  };

  return (
    <div
      className={cn(
        "inline-flex gap-2 p-1 overflow-x-auto rounded-2xl",
        className
      )}
    >
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/#${cat.name}`}
          onClick={() => handleClick(cat.id)}
          className={cn(
            // Default appearance: higher contrast on white background
            "flex items-center font-semibold text-sm h-11 px-5 rounded-2xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-100",
            // Active appearance: stronger primary contrast
            activeId === cat.id &&
              "bg-primary-100 text-primary-700 hover:bg-primary/20 border-primary"
          )}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
};
