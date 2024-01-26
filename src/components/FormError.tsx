import { BsExclamationTriangleFill } from "react-icons/bs";

type TFormErrorProps = {
  message?: string;
};

export function FromError({ message }: TFormErrorProps) {
  return (
    <div className="flex items-center gap-x-2 rounded-xl bg-red-500/30 p-3 text-sm text-white">
      <BsExclamationTriangleFill />
      <p>{message}</p>
    </div>
  );
}
