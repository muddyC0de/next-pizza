"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import { Categories } from "./categoires";
import { Sort } from "./sort";
import { Category } from "@prisma/client";
import { FiltersDrawer } from "./filters-drawer";
import { CategoriesMobile } from "./categories-mobile";

interface Props {
  className?: string;
  categories: Category[];
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10  backdrop-blur-[20px] bg-[#ffffffbf]",
        className
      )}
    >
      <Container className="flex items-center justify-center md:justify-between">
        <div className="md:hidden overflow-x-auto">
          <CategoriesMobile categories={categories} />
        </div>
        <div className="hidden md:block overflow-x-auto">
          <Categories categories={categories} />
        </div>
        <div className="hidden md:block">
          <FiltersDrawer />
          <Sort />
        </div>
      </Container>
    </div>
  );
};
