"use client";
import React from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store/category";
import Link from "next/link";
interface Props {
  title: string;
  products: any[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  products,
  listClassName,
  categoryId,
  className,
}) => {
  const setCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.5,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, categoryId, title, setCategoryId]);

  if (products.length === 0) return null;

  return (
    <div ref={intersectionRef} id={title} className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-3" />

      <div
        className={cn(
          "grid gap-5 grid-cols-1 xs:grid-cols-2  md:grid-cols-3 ",
          listClassName
        )}
      >
        {products.map((product) => (
          <Link
            className="flex justify-between"
            key={product.id}
            scroll={false}
            href={`/product/${product.id}`}
          >
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.items[0].price}
              ingredients={product.ingredients}
              description={product.description}
              imageUrl={product.imageUrl}
              className="w-full"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
