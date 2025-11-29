import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "quiet";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-black text-white hover:bg-gray-900 shadow-lg shadow-black/10 active:translate-y-[1px]",
  secondary:
    "bg-white text-black border border-gray-200 hover:border-gray-300 hover:shadow-lg shadow-black/5",
  ghost:
    "bg-white/10 text-white border border-white/20 backdrop-blur hover:bg-white/15",
  quiet:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-transparent",
};

const sizeStyles: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  icon,
  fullWidth,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-150 ${variantStyles[variant]} ${sizeStyles[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

