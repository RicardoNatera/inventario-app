"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { LogOut } from "lucide-react";

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
            className="fixed top-0 left-0 w-60 h-full bg-white shadow-md z-50 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <button className="mb-4 text-lg cursor-pointer" onClick={toggle}>
                ✕
              </button>
              <nav className="space-y-4">
                {enlaces.map((enlace) => (
                  <Link
                    key={enlace.href}
                    href={enlace.href}
                    className={`block px-2 py-1 rounded hover:bg-gray-200 ${
                      pathname === enlace.href ? "font-semibold text-blue-600" : ""
                    }`}
                    onClick={toggle}
                  >
                    {enlace.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Botón de cerrar sesión abajo */}
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  toggle()
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
