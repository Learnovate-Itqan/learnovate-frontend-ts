import React from "react";

type TTagProps = {
  children: React.ReactNode;
};

export function Tag({ children }: TTagProps) {
  return (
    <span className="inline-flex items-center justify-center gap-1 rounded-lg text-black bg-[#E5E7ED] px-2 py-1">
      {children}
    </span>
  );
}
