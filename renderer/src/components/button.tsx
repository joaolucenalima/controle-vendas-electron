import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

export function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const buttonVariants = {
    primary: "bg-green-600 text-white hover:bg-green-500",
    secondary: "border-2 border-green-600 text-green-700 bg-transparent hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-500",
  };

  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 px-4 h-10 rounded-md transition-colors ${clsx(
        buttonVariants[variant]
      )} ${props.className || ""}`}
    >
      {children}
    </button>
  );
}
