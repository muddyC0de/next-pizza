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
          className={cn(
            "flex bg-slate-100/60  text-gray-500 items-center font-bold text-sm h-11 rounded-2xl px-5",
            activeId === cat.id && " text-primary bg-primary/10"
          )}
          href={`/#${cat.name}`}
          onClick={() => handleClick(cat.id)}
          key={cat.id}
        >
          <button>{cat.name}</button>
        </Link>
      ))}
    </div>
  );
};
