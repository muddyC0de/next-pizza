"use client";

import {
  FormInput,
  FormTextarea,
} from "../../../components/shared/form-components";
import AutoComplete from "react-google-autocomplete";
import { WhiteBlock } from "../../../components/shared/white-block";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../../../components/shared/error-text";

interface Props {
  className?: string;
}

export const CheckoutDeliveryInfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адреса доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput
          name={"address"}
          className="text-base"
          placeholder="Адреса"
        />

        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="Коментар до замовлення"
        />
      </div>
    </WhiteBlock>
  );
};
