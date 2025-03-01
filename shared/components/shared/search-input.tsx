"use client";

import React from "react";
import { Search } from "lucide-react";
import { useDebounce } from "react-use";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";
import { useSearchStore } from "@/shared/store/search";
import Image from "next/image";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const { isActive, setActive } = useSearchStore((state) => ({
    isActive: state.isActive,
    setActive: state.setActive,
  }));

  const [value, setValue] = React.useState("");
  const [isFocus, setIsFocus] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);

  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useDebounce(
    () => {
      async function fetch() {
        if (value.trim() === "") return;
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
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setTimeout(() => {
      if (ref.current && !ref.current.contains(document.activeElement)) {
        setIsFocus(false);
        setActive(false);
      }
    }, 100);
  };
  React.useEffect(() => {
    if (isActive) {
      setIsFocus(true);
      inputRef.current?.focus();
    }
  }, [isActive]);

  React.useEffect(() => {
    async function fetch() {
      const data = await Api.products.search("");
      setProducts(data);
    }

    fetch();
  }, []);
  return (
    <>
      {isFocus && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>
      )}
      <div
        ref={ref}
        className="flex rounded-2xl flex-1 justify-between relative h-11 z-40"
        onBlur={handleBlur}
        tabIndex={-1}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400 mb-5" />
        <input
          ref={inputRef}
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
                scroll={false}
              >
                <div className="px-3 py-2 hover:bg-primary/10 cursor-pointer">
                  <div className="flex gap-3 align-center">
                    <Image
                      className="rounded-sm"
                      width={32}
                      height={32}
                      src={product.imageUrl}
                      alt={product.name}
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
