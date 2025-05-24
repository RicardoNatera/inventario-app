"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">Dashboard Productos</Link>

      <nav>
        {token ? (
          <>
            <Link href="/productos" className="mr-4">Productos</Link>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
