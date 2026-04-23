import { cn } from "@/utils";

type CustomCheckBoxProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  htmlFor: string;
  checked?: boolean;
  labelClassName?: string;
  checkboxClassName?: string;
  inputType: "checkbox" | "radio";
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function CustomCheckBox({
  inputType,
  checked,
  htmlFor,
  id,
  label,
  name,
  value,
  labelClassName,
  checkboxClassName,
  ...rest
}: CustomCheckBoxProps) {
  return (
    <div className="flex items-center gap-2">
      {" "}
      {}
      <input
        type={inputType}
        checked={checked}
        value={value}
        name={name}
        id={id}
        className={cn(
          "w-4 h-4 accent-blue-500 cursor-pointer",
          checkboxClassName,
        )}
        {...rest}
      />
      <label
        htmlFor={htmlFor}
        className={cn("font-medium text-gray-600", labelClassName)}
      >
        {label}
      </label>
    </div>
  );
}
