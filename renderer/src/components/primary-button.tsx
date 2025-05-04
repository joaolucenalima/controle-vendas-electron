import { ReactNode } from "react";

type PrimaryButtonProps = {
  children: ReactNode;
  handleClick?: () => void
}

export function PrimaryButton({ children, handleClick }: PrimaryButtonProps) {
  return (
    <button 
      className="inline-flex items-center gap-1 rounded bg-green-600 text-white px-2 py-1 hover:bg-green-500 transition-colors"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}