"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Rutas públicas: /login y /register
    const rutasPublicas = ["/login", "/register"];

    // Si no hay token y no estamos en la ruta /login → redirigir
    if (!token && !rutasPublicas.includes(pathname)) {
      router.replace("/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
