"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "../../ui";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  isClearable?: boolean;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  isClearable = true,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "");
  };

  return (
    <div className={className}>
      <p className="font-medium mb2">
        {label} {required && <RequiredSymbol />}
      </p>

      <div className="relative">
        <Input
          className="h-12 border-solid rounded-md border-input border text-md"
          {...register(name)}
          {...props}
        />
        {value && isClearable && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
