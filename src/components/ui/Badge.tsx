import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 text-[11px] font-medium tracking-widest uppercase border border-mist text-stone rounded-pill",
        className
      )}
    >
      {children}
    </span>
  );
}
