import { BookingStorageInit } from "@/components/providers/BookingStorageInit";
import { colors, logo, siteConfig } from "@/data/site";
import type { Metadata, Viewport } from "next";
import { Alice, Montserrat } from "next/font/google";
import "./globals.css";

const alice = Alice({
  variable: "--font-alice",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Bienestar Emocional y Salud Mental`,
  description:
    "Empresa psicosocial orientada al bienestar emocional y fortalecimiento personal. Enfoque en mujeres y NNA en situación de vulnerabilidad. Promoción y prevención en salud mental.",
  icons: { icon: logo.favicon },
};

export const viewport: Viewport = {
  themeColor: colors.primary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${alice.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <BookingStorageInit />
        {children}
      </body>
    </html>
  );
}
