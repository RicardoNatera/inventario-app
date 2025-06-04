"use client";
import { Producto } from "@/interfaces/producto";

interface Props {
  productos: Producto[];
  rol: string;
  abrirEditar: (producto: Producto) => void;
  eliminarProducto: (id: number) => void;
}

export default function TablaProductos({
  productos,
  rol,
  abrirEditar,
  eliminarProducto,
}: Props) {
  if (productos.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No hay productos para mostrar.</p>;
  }

  return (
    <table className="w-full bg-white border border-gray-300 shadow-sm rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b">Nombre</th>
          <th className="py-2 px-4 border-b">Precio</th>
          <th className="py-2 px-4 border-b">Stock</th>
          {rol === "ADMIN" && <th className="py-2 px-4 border-b">Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id} className="text-center">
            <td className="py-2 px-4 border-b">{p.nombre}</td>
            <td className="px-4 py-2 border-b">
              ${p.precio.toFixed(2)}
              {p.precio < 20 && (
                <span
                  title="Este producto cuesta menos de $20"
                  className="ml-2 inline-block bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-full cursor-help"
                >
                  🔥 Oferta
                </span>
              )}
            </td>
            <td className="py-2 px-4 border-b">{p.stock}</td>
            {rol === "ADMIN" && (
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  onClick={() => abrirEditar(p)}
                  className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(p.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
