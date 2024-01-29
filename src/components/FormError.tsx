import { BsExclamationTriangleFill } from "react-icons/bs";

type TFormErrorProps = {
  messages: string[];
};

export function FromError({ messages }: TFormErrorProps) {
  return (
    <ul
      className={`flex flex-col gap-2 rounded-xl bg-red-500/30 p-3 text-sm text-white ${messages.length === 0 && "hidden"}`}
    >
      {messages.map((message, index) => (
        <li key={index} className="flex gap-x-2.5">
          <BsExclamationTriangleFill className="translate-y-0.5 text-sm" />
          <span>{message}</span>
        </li>
      ))}
    </ul>
  );
}
