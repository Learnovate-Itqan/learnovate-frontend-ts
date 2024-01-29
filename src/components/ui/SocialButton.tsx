import { FcGoogle } from "react-icons/fc";

type TSocialButtonProps = {
  text: string;
  onClick: () => void;
};

export function SocialButton({ text, onClick }: TSocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl border-[0.1rem] border-zinc-500 bg-transparent px-4 py-2.5 font-medium leading-snug transition-colors duration-300 ease-cubic hover:bg-royal-blue/10"
    >
      <FcGoogle className="text-2xl" />
      <span>{text}</span>
    </button>
  );
}
