type TButtonProps = {
  type: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function Button({ type, text, onClick, disabled }: TButtonProps) {
  return (
    <button
      type={type}
      className="w-full rounded-xl bg-royal-blue p-2.5 font-medium text-white transition-colors duration-300 ease-cubic hover:bg-royal-blue/90"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
