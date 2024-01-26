import { Ref, forwardRef } from "react";

type TInputProps = {
  type: "text" | "number" | "email" | "password";
  label: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
};

export const InputField = forwardRef(
  ({ label, placeholder, type, name, disabled, ...rest }: TInputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          autoComplete="off"
          placeholder={placeholder}
          disabled={disabled}
          className="rounded-xl border-[0.1rem] border-zinc-400 bg-transparent py-2.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
          {...rest}
        />
      </div>
    );
  }
);
