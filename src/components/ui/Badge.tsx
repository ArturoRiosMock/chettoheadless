type BadgeVariant = "new" | "discount" | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: "bg-neutral-950 text-white",
  discount: "bg-red-500 text-white",
  default: "bg-neutral-100 text-neutral-700",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
