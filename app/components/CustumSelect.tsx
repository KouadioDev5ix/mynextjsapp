import React from "react";
// import { cn } from "../utils";
import { cn } from "@/utils";

type CustumSelectProps<T> = {
  htmlFor?: string;
  id: string;
  label?: string;
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  onChange: (item: T) => React.ReactNode;
  placeHoder: string;
  getKey: (item: T) => number | string;
  selectClassName?: string;
  labelClassName?: string;
};

export default function CustumSelect<T>({
  labelClassName,
  selectClassName,
  getKey,
  htmlFor,
  id,
  label,
  labelKey,
  onChange,
  options,
  placeHoder,
  valueKey,
}: CustumSelectProps<T>) {
  /**
   *
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    const selectedOption = options.find(
      (item) => String(item[valueKey]) === selectedValue,
    );

    if (selectedOption) onChange(selectedOption);
  };

  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={cn("font-medium text-gray-600", labelClassName)}
      >
        {label}
      </label>
      <select
        id={id}
        onChange={handleChange}
        className={cn(
          "border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none rounded-lg px-3 py-2",
          selectClassName,
        )}
      >
        <option value="" disabled>
          {placeHoder ? placeHoder : "Selectionner une valeur"}
        </option>

        {options.map((option, index) => (
          <option
            value={String(option[valueKey])}
            key={getKey ? getKey(option) : index}
          >
            {String(option[labelKey])}
          </option>
        ))}
      </select>
    </div>
  );
}
