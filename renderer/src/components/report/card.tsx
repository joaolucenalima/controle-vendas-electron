export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`p-4 flex flex-col justify-center bg-white rounded-lg border border-gray-300 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
