import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui/button";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  description?: string;
  isLoading: boolean;
  onSumbit: () => void;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  isLoading,
  description,
  onSumbit,
  className,
}) => {
  const handleClickAdd = () => {
    onSumbit();
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
      <div className="w-[490px] bg-[#f7f6f5] justify-between flex flex-col p-7">
        <div>
          <Title text={name} size="md" className="mb-1 font-extrabold" />

          <p className="text-gray-400">{description}</p>
        </div>

        <Button
          loading={isLoading}
          onClick={handleClickAdd}
          className={"h-[55px] px-10 text-base rounded-[18px] w-full mt-7"}
        >
          Додати в корзину за {price} ₴
        </Button>
      </div>
    </div>
  );
};
