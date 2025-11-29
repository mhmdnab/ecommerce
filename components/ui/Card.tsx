import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({ children, className = "", padded = true }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_15px_40px_rgba(15,23,42,0.08)] ${className}`}
    >
      <div className={padded ? "p-6 md:p-7" : ""}>{children}</div>
    </div>
  );
}
