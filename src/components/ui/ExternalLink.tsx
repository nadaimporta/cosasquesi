import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

export function ExternalLink({ href, label, className, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      aria-label={label}
      className={cn(className)}
    >
      {children}
    </a>
  );
}
