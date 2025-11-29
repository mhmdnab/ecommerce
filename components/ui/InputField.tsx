import type { InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  icon?: ReactNode;
}

export function InputField({
  label,
  hint,
  icon,
  className = "",
  ...props
}: InputFieldProps) {
  const hasIcon = Boolean(icon);

  return (
    <label className="block space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">{label}</span>
          {hint && <span className="text-xs text-gray-500">{hint}</span>}
        </div>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
        <input
          className={`w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-[0_8px_30px_rgba(15,23,42,0.06)] focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5 ${
            hasIcon ? "pl-10" : ""
          } ${className}`}
          {...props}
        />
      </div>
    </label>
  );
}

