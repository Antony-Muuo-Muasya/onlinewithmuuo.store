import React from "react";

interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "primary", children, className = "" }: BadgeProps) {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border";

  const variantStyles = {
    primary: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-sm shadow-emerald-500/5",
    secondary: "bg-slate-800 text-slate-300 border-slate-700",
    success: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    outline: "bg-transparent text-slate-400 border-slate-700",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
