"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="w-full bg-blue-600 text-white py-4 px-6 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard de Productos</h1>

      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-100"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
