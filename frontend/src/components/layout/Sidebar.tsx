"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { abierto, toggle } = useSidebar();

  const enlaces = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/ofertas", label: "Ofertas" },
  ];

  return (
    <>
      {/* Sidebar para escritorio */}
      <aside className="w-60 min-h-screen bg-gray-100 border-r px-4 py-6 hidden md:block">
        <nav className="space-y-4">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className={`block px-2 py-1 rounded hover:bg-gray-200 ${
                pathname === enlace.href ? "font-semibold text-blue-600" : ""
              }`}
            >
              {enlace.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Sidebar móvil desplegable */}
      {abierto && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggle}>
          <aside
            className="fixed top-0 left-0 w-60 h-full bg-white shadow-md z-50 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="mb-4 cursor-pointer text-lg" onClick={toggle}>
              ✕ Cerrar
            </button>
            <nav className="space-y-4">
              {enlaces.map((enlace) => (
                <Link
                  key={enlace.href}
                  href={enlace.href}
                  className={`block px-2 py-1 rounded hover:bg-gray-200 ${
                    pathname === enlace.href ? "font-semibold text-blue-600" : ""
                  }`}
                  onClick={toggle} // cerrar menú al hacer clic
                >
                  {enlace.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
