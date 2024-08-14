import { Plus } from "lucide-react";
import React from "react";
import { Ingredient } from "@prisma/client";
import { getCartItemDetails } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";
export interface ProductProps {
  id: number;
  name: string;
  price: number;
  ingredients?: Ingredient[];
  description?: string;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  description,
  className,
}) => {
  return (
    <div className={cn(className, "flex [flex-flow:column] justify-between")}>
      <div>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>
        <h1 className="mb-1 mt-3 font-bold text-[20px]">{name}</h1>
        <p className="text-sm text-gray-400 ">
          {ingredients ? getCartItemDetails(ingredients) : ""}
          {description}
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            від <b>{price} ₴</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className=" mr-1" />
            Додати
          </Button>
        </div>
      </div>
    </div>
  );
};
