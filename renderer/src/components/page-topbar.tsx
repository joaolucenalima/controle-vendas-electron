import { ReactNode } from "react";

type PageTopbarProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function PageTopbar({ children, className, ...props }: PageTopbarProps) {
  return (
    <div className={`bg-[#fafafa] border-y border-zinc-300 px-4 h-12 ${className}`} {...props}>
      {children}
    </div>
  );
}