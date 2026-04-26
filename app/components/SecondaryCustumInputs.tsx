import { cn } from "@/utils";

type CustumSelectProps<T> = {
  htmlFor?: string;
  id?: string;
  label?: string;
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  placeHoder: string;
  getKey?: (item: T) => number | string;
  selectClassName?: string;
  labelClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function CustumSelect<T>({
  labelClassName,
  selectClassName,
  getKey,
  htmlFor,
  id,
  label,
  labelKey,
  options,
  placeHoder,
  valueKey,
  value,
  onChange,
}: CustumSelectProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn("font-medium text-stone-700 text-sm", labelClassName)}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={cn(
          "border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 outline-none rounded-lg px-3 py-2 text-sm text-stone-800 w-full bg-white transition-all",
          selectClassName,
        )}
      >
        <option value="" disabled>
          {placeHoder || "Sélectionner une valeur"}
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
