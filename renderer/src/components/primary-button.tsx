import { ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function PrimaryButton({ children, handleClick, type }: PrimaryButtonProps) {
  return (
    <button
      className="inline-flex items-center gap-1 rounded bg-green-600 text-white px-3 py-1 hover:bg-green-500 transition-colors"
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  )
}