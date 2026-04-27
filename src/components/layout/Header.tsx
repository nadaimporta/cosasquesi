import Image from "next/image";
import Link from "next/link";
import { AffiliateDisclosure } from "./AffiliateDisclosure";

const NAV_LINKS = [
  { href: "/productos", label: "Productos" },
  { href: "/colecciones", label: "Colecciones" },
  { href: "/sobre-nosotros", label: "De qué va esto" },
];

export function Header() {
  return (
    <header className="w-full">
      <AffiliateDisclosure />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/nadaimporta.svg"
            alt="Cosas que sí"
            width={18}
            height={22}
            className="object-contain"
            priority
          />
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav toggle — simplified, no JS needed for MVP */}
        <nav className="flex sm:hidden gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-widest text-stone hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

