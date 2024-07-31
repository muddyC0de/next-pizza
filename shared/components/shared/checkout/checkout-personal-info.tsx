import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form-components";

interface Props {
  className?: string;
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональна інформація" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Ім'я" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамілія"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
