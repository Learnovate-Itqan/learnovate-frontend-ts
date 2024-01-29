import { RxCheckCircled } from "react-icons/rx";

type TFormSuccessProps = {
  message?: string;
};

export function FromSuccess({ message }: TFormSuccessProps) {
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-mint-green/70 p-3 text-sm text-white">
      <RxCheckCircled />
      <p>{message}</p>
    </div>
  );
}
