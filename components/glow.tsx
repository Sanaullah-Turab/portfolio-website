import { ReactNode, HTMLAttributes } from "react";

interface GlowProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  active: boolean;
  variant?: "text" | "underline";
}

export function Glow({
  children,
  active,
  variant = "text",
  className = "",
  ...props
}: GlowProps) {
  const glowClass = variant === "text" ? "glow-text" : "glow-underline";
  
  return (
    <span className={`${active ? glowClass : ""} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
