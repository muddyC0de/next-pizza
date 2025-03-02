"use client";

import React from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Title } from "@/components/shared";
import { Input, Skeleton } from "@/components/ui";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  selectedValues?: Set<string>;
  onClickCheckbox?: (value: string) => void;
  loading?: boolean;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  selectedValues,
  limit = 5,
  searchInputPlaceholder = "Пошук...",
  onClickCheckbox,
  className,
  loading,
}) => {
  const [isShowAll, setIsShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const countItemsRender = isShowAll
    ? items.filter((item) =>
        item.text?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <Title text={title} size="xs" className="mb-3 font-bold" />
        {Array.from({ length: limit }).map((_, index) => (
          <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
        ))}
        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Title text={title} size="xs" className="mb-3 font-bold" />
      {isShowAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none font-semibold"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {countItemsRender?.map((item, index) => (
          <FilterCheckbox
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            key={index}
            value={item.value}
            text={item.text}
            name={item.name}
            checked={selectedValues?.has(item.value) || false}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={isShowAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setIsShowAll(!isShowAll)}
            className="text-primary mt-3"
          >
            {isShowAll ? "Сховати" : "+ Показати все"}
          </button>
        </div>
      )}
    </div>
  );
};
