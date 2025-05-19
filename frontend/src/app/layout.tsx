import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard de Productos",
  description: "App de gestión creada con Next.js + TailwindCSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}