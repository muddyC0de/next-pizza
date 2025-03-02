import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string;
  size: number;
}

export const PizzaImage: React.FC<Props> = ({ className, imageUrl, size }) => {
  const getSizeClasses = (size: number) => {
    if (size <= 25) return "w-[50vw] max-w-[300px] h-auto";
    if (size <= 30) return "w-[60vw] max-w-[400px] h-auto";
    return "w-[70vw] max-w-[500px] h-auto";
  };

  return (
    <div
      className={cn(
        "flex items-center h-full justify-center md:flex-1 relative w-full",
        className
      )}
    >
      <Image
        src={imageUrl}
        alt="Pizza"
        width={500}
        height={500}
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300",
          getSizeClasses(size)
        )}
      />

      <div className="absolute hidden lg:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[90vw] max-w-[450px] h-[90vw] max-h-[450px]" />
      <div className="absolute hidden lg:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[75vw] max-w-[370px] h-[75vw] max-h-[370px]" />
    </div>
  );
};
