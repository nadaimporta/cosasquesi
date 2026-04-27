import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
    "Productos cuidadosamente seleccionados. Sin ruido, solo lo bueno.",
  metadataBase: new URL("https://cosasquesi.com"),
  openGraph: {
    siteName: "Cosas que sí",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
