import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-neutral-950 text-white hover:bg-neutral-800 transition-colors",
  secondary:
    "bg-brand-500 text-white hover:bg-brand-600 transition-colors",
  outline:
    "border border-neutral-300 text-neutral-950 hover:bg-neutral-50 transition-colors",
  ghost:
    "text-neutral-950 hover:bg-neutral-100 transition-colors",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg";
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
