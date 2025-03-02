import React from "react";
import { CountIconButton } from "./count-icon-button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export interface CountButtonProps {
  value?: number;
  size?: "sm" | "lg";
  loading?: boolean;
  className?: string;
  onClick?: (type: "plus" | "minus") => void;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = "sm",
  loading,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-3",
        className
      )}
    >
      <CountIconButton
        onClick={() => onClick?.("minus")}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      {loading ? (
        <div className="w-[16.81px] flex justify-center items-center h-[20px]">
          <LoaderCircle size={16} className="animate-spin" />
        </div>
      ) : (
        <div className="w-[16.81px] flex justify-center items-center h-[20px]">
          <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>
        </div>
      )}

      <CountIconButton
        onClick={() => onClick?.("plus")}
        size={size}
        type="plus"
      />
    </div>
  );
};
