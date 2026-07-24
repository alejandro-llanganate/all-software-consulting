import { BookingStorageInit } from "@/components/providers/BookingStorageInit";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { colors, siteConfig } from "@/data/site";
import { assetPath } from "@/lib/asset-path";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Bienestar Emocional y Salud Mental`,
  description:
    "Empresa psicosocial en Quito. Terapias basadas en evidencia, cognitivo-conductuales y conductuales contextuales. Acceso asequible a salud mental.",
  icons: {
    icon: [
      { url: assetPath("/favicon-habitadas.png"), type: "image/png" },
      { url: assetPath("/favicon.ico"), sizes: "any" },
    ],
    apple: [{ url: assetPath("/favicon-habitadas.png"), type: "image/png" }],
    shortcut: assetPath("/favicon-habitadas.png"),
  },
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
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,400;1,400&family=Raleway:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <BookingStorageInit />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
