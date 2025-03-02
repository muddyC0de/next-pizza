import { cn } from "@/lib/utils";
import { Title } from "../../../title";
import { Button } from "../../../../ui/button";
import Image from "next/image";

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
    <div
      className={cn(
        className,
        "flex flex-1 items-center lg:items-stretch flex-col lg:flex-row"
      )}
    >
      <div className="flex items-center justify-center flex-1 relative w-full">
        <div className="relative w-[350px] h-[350px] sm:w-[300px] sm:h-[300px] xs:w-[250px] xs:h-[250px]">
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="contain"
            className="relative left-2 top-2 transition-all z-10 duration-300"
          />
        </div>
      </div>

      <div className="w-full max-w-[490px] lg:w-[490px] bg-[#f7f6f5] justify-between flex flex-col p-7">
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
