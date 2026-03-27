import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  title: "ProjectCore — Agencia Digital Full-Service | Web, IA y Automatización",
  description:
    "Webs profesionales, automatizaciones con IA, marketing digital y software a medida. Diagnóstico gratuito. Sin permanencia. Resultados en días.",
  keywords: [
    "agencia digital",
    "desarrollo web",
    "automatización IA",
    "marketing digital",
    "software a medida",
    "agencia full-service",
    "pymes España",
  ],
  authors: [{ name: "ProjectCore" }],
  creator: "ProjectCore",
  metadataBase: new URL("https://projectcore.io"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://projectcore.io",
    title: "ProjectCore — Agencia Digital Full-Service | Web, IA y Automatización",
    description:
      "Webs profesionales, automatizaciones con IA, marketing digital y software a medida. Diagnóstico gratuito. Sin permanencia. Resultados en días.",
    siteName: "ProjectCore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ProjectCore — Agencia Digital Full-Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProjectCore — Agencia Digital Full-Service",
    description:
      "Webs profesionales, automatizaciones con IA, marketing digital y software a medida. Diagnóstico gratuito.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-full antialiased font-[var(--font-inter)]">{children}</body>
    </html>
  );
}
