import React, { forwardRef, useRef, useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { IoCamera } from "react-icons/io5";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ImageUploader = forwardRef((props: ControllerRenderProps<FieldValues>, _ref) => {
  const hiddenInputRef = useRef<HTMLInputElement>();
  console.log("props", props.value);
  const [preview, setPreview] = useState<string | null>(props.value);
  const handleUploadedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    console.log("event.target.files", event.target.files);
    const file = event.target.files[0];
    props.onChange(event);
    const urlImage = URL.createObjectURL(file);
    console.log("urlImage", urlImage);
    setPreview(urlImage);
  };

  const onUpload = () => {
    if (hiddenInputRef.current) hiddenInputRef?.current?.click();
  };

  return (
    <div
      onClick={onUpload}
      className="rounded-full flex justify-center items-center overflow-hidden cursor-pointer relative w-20 h-20 shrink-0 aspect-square border-[0.1rem] bg-zinc-200 outline-none"
    >
      {preview ? <img src={preview} alt="uploaded Image" /> : <IoCamera size={24} />}
      <input
        {...props}
        type="file"
        onChange={handleUploadedFile}
        ref={(e) => {
          hiddenInputRef.current = e as HTMLInputElement;
        }}
        accept="image/*"
        value={props.value?.name || ""} // Set value to props.value?.name
        className=" absolute hidden cursor-pointer w-24 h-24"
      />
    </div>
  );
});
