"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerProductos } from "@/lib/api";
import { Producto } from "@/interfaces/producto";

export default function OfertasPage() {
  const [ofertas, setOfertas] = useState<Producto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchOfertas = async () => {
      try {
        const { data } = await obtenerProductos();
        const enOferta = data.filter((p) => p.precio < 20);
        setOfertas(enOferta);
      } catch (err) {
        alert("Error al cargar ofertas");
      }
    };

    fetchOfertas();
  }, [router]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Productos en Oferta 🎉</h1>
      <p className="mb-6 text-gray-700">
        Aquí se muestran los productos que tienen un precio menor a <strong>$20</strong>. 
        Estos se consideran como <span className="text-red-600 font-semibold">productos en oferta</span> dentro del sistema.
      </p>

      {ofertas.length === 0 ? (
        <p>No hay productos en oferta.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Nombre</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {ofertas.map((producto) => (
              <tr key={producto.id} className="border-t">
                <td className="p-2">{producto.nombre}</td>
                <td className="p-2 text-red-600 font-semibold">${producto.precio}</td>
                <td className="p-2">{producto.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
