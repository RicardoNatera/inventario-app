"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AuthGuard from "../auth/AuthGuard";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  if (isLogin) {
    return <>{children}</>; // no mostrar Header ni Sidebar en login
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <AuthGuard>
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </AuthGuard>
      </div>
    </div>
  );
}
