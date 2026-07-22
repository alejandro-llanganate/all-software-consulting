import { BookingStorageInit } from "@/components/providers/BookingStorageInit";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { colors, logo, siteConfig } from "@/data/site";
import { assetPath } from "@/lib/asset-path";
import type { Metadata, Viewport } from "next";
import { Alice, Montserrat, Nunito } from "next/font/google";
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

/** Tipografía redondeada similar al wordmark del logo HABITADAS */
const nunito = Nunito({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Bienestar Emocional y Salud Mental`,
  description:
    "Empresa psicosocial en Quito. Terapias basadas en evidencia, cognitivo-conductuales y conductuales contextuales. Acceso asequible a salud mental.",
  icons: { icon: assetPath(logo.favicon) },
};

export const viewport: Viewport = {
  themeColor: colors.primary,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${alice.variable} ${montserrat.variable} ${nunito.variable}`}
    >
      <body className="antialiased">
        <BookingStorageInit />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
