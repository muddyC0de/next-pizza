"use client";

import React from "react";
import { Search } from "lucide-react";
import { useClickAway, useDebounce } from "react-use";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [value, setValue] = React.useState("");
  const [isFocus, setIsFocus] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const ref = React.useRef(null);
  useClickAway(ref, () => setIsFocus(false));

  useDebounce(
    () => {
      async function fetch() {
        const data = await Api.products.search(value);
        setProducts(data);
      }

      fetch();
    },
    250,
    [value]
  );

  const onClickItem = () => {
    setIsFocus(false);
    setValue("");
    setProducts([]);
  };

  return (
    <>
      {isFocus && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>
      )}
      <div
        ref={ref}
        className="flex  rounded-2xl flex-1 justify-between relative h-11 z-40"
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400 mb-5" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          placeholder="Знайти піццу..."
          onFocus={() => setIsFocus(true)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              isFocus && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                onClick={onClickItem}
                href={`/product/${product.id}`}
              >
                <div className="px-3  py-2 hover:bg-primary/10 cursor-pointer">
                  <div className="flex gap-3 align-center">
                    <img
                      className="rounded-sm h-8 w-8"
                      src={product.imageUrl}
                      alt=""
                    />
                    <p>{product.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
