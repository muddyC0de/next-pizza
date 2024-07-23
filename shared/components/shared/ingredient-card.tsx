import { cn } from "@/shared/lib/utils";
import { Ingredient } from "@prisma/client";
import { CircleCheck } from "lucide-react";

interface Props {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  isAdded: boolean;
  onClick: () => void;
  className?: string;
}

export const IngredientCard: React.FC<Props> = ({
  id,
  imageUrl,
  name,
  price,
  onClick,
  isAdded,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center flex-col justify-between p-1 rounded-md w-32 text-center relative cursor-pointer border-2  transition-all duration-150 border-transparent shadow-md bg-white",
        isAdded && " border-primary",
        className
      )}
    >
      <CircleCheck
        color="#ff5e00"
        className={cn(
          "absolute top-1 right-1 transition-all duration-150",
          isAdded && "opacity-100",
          !isAdded && "opacity-0"
        )}
      />
      <div className="flex flex-col items-center">
        <img
          className="mb-1"
          height={110}
          width={110}
          src={imageUrl}
          alt={name}
        />
        <span className="text-[13px] font-semibold">{name}</span>
      </div>
      <span className="font-bold">{price} ₴</span>
    </div>
  );
};
