interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
      {description && (
        <p className="max-w-2xl text-sm sm:text-base text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}

