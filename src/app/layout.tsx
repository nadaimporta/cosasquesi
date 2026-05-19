import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { ClickSound } from "@/components/ui/ClickSound";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cosas que sí",
    template: "%s | Cosas que sí",
  },
  description:
    "La vida es demasiado corta como para no rodearse de cosas bonitas.",
  metadataBase: new URL("https://cosasquesi.com"),
  openGraph: {
    title: "Cosas que sí — La vida es demasiado corta como para no rodearse de cosas bonitas",
    siteName: "Cosas que sí",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/og-image@2x.jpg", width: 2400, height: 1260 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosas que sí — La vida es demasiado corta como para no rodearse de cosas bonitas",
    images: ["/og-image@2x.jpg"],
  },
  alternates: {
    canonical: "https://cosasquesi.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${geist.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <ClickSound />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
