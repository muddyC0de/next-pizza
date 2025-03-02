"use client";

import { FormTextarea } from "../../../components/shared/form-components";
import AutoComplete from "react-google-autocomplete";
import { WhiteBlock } from "../../../components/shared/white-block";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../../../components/shared/error-text";

interface Props {
  className?: string;
}

export const CheckoutDeliveryInfo: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адреса доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <AutoComplete
                onChange={field.onChange}
                apiKey={"AIzaSyDNoMW_f9hvC37m65yJdpQvQi76omrMby0"}
                options={{
                  types: ["address"],
                  componentRestrictions: { country: "ua" },
                }}
                language="uk"
                className="text-base flex h-12 w-full mb-2 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                onPlaceSelected={(place) => console.log(place)}
              />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </div>
          )}
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
