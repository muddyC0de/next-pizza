import { Plus } from "lucide-react";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import Link from "next/link";
import { Ingredient } from "@prisma/client";
import { getCartItemDetails } from "@/shared/lib";
export interface ProductProps {
  id: number;
  name: string;
  price: number;
  ingredients?: Ingredient[];
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className,
}) => {
  return (
    <div className={className}>
      <Link scroll={false} href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          {ingredients ? getCartItemDetails(ingredients) : ""}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₴</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className=" mr-1" />
            Додати
          </Button>
        </div>
      </Link>
    </div>
  );
};
