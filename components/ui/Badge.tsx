import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning";
}

const toneStyles: Record<BadgeProps["tone"], string> = {
  neutral: "bg-gray-100 text-gray-900",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  warning: "bg-amber-50 text-amber-800 border border-amber-100",
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${toneStyles[tone]}`}
    >
      {children}
    </span>
  );
}
