import { ReactNode } from "react";

type PageTopbarProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  title: string;
};

export function PageTopbar({ children, className = '', title, ...props }: PageTopbarProps) {
  return (
    <div className={`flex items-center justify-between mt-2 px-4 h-max ${className}`} {...props}>
      <h1 className="text-2xl font-medium">{title}</h1>
      {children}
    </div>
  );
}