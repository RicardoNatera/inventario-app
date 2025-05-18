import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} flex`}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </body>
    </html>
  );
}
