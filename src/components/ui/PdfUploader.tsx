import { useRef } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FiDownload } from "react-icons/fi";

import { Input } from "./input";

export function PdfUploader(props: ControllerRenderProps<FieldValues>) {
  const hiddenInputRef = useRef<HTMLInputElement>();

  const onUpload = () => {
    if (hiddenInputRef.current) hiddenInputRef?.current?.click();
  };

  return (
    <div
      onClick={onUpload}
      className="rounded-lg flex gap-4  border-[0.1rem] border-zinc-400 bg-transparent py-1.5 pe-2.5 ps-4 outline-none placeholder:text-zinc-400 invalid:border-red-500 focus:border-white"
    >
      <FiDownload size={22} />
      <label >{props.value ? props.value : "Add File"}</label>
      <Input
        {...props}
        type="file"
        ref={(e) => {
          hiddenInputRef.current = e as HTMLInputElement;
        }}
        accept="application/pdf,application/vnd.ms-excel"
        value={props.value?.name || ""} // Set value to props.value?.name
        className=" absolute hidden cursor-pointer w-24 h-24"
      />
    </div>
  );
}
