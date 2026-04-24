import React from "react";
import { cn } from "@/utils";

type CustumInputs = {
  inputType: "text" | "email" | "password";
  placeHolder?: string;
  inputClassName?: string;
  label?: string;
  id?: string;
  labelClassName?: string;
  htmlFor?: string;
  inputName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function CustumInputs({
  inputType,
  placeHolder,
  inputClassName,
  label,
  id,
  labelClassName,
  htmlFor,
  inputName,
  ...rest
}: CustumInputs) {
  return (
    <div>
      <div>
        <label htmlFor={htmlFor} className={labelClassName}>
          {label}
        </label>
      </div>

      <input
        type={inputType}
        name={inputName}
        id={id}
        placeholder={placeHolder}
        className={cn(
          "w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none rounded-lg px-3 py-2",
          inputClassName,
        )}
        {...rest}
      />
    </div>
  );
}
