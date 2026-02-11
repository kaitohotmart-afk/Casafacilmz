import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casa Fácil MZ | Imobiliária Líder em Tete",
  description: "A plataforma mais segura para comprar, vender ou alugar casas, apartamentos e terrenos em Tete, Moçambique. Direto com o proprietário.",
};

import WarningBanner from "@/components/WarningBanner";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

// ... imports

import { Suspense } from 'react';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import InstallAppBanner from '@/components/InstallAppBanner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable}`}>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <InstallAppBanner />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {children}
          <Footer />
        </div>
        <FloatingContact />
      </body>
    </html>
  );
}
