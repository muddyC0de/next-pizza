"use client";

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  categories: Category[];
}

export const Categories: React.FC<Props> = ({ categories, className }) => {
  const activeId = useCategoryStore((state) => state.activeId);
  const setActiveId = useCategoryStore((state) => state.setActiveId);

  const handleClick = (id: number) => {
    setActiveId(id);
  };

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map((cat) => (
        <Link
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeId === cat.id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
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
