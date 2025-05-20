"use client";

import { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

const productosIniciales: Producto[] = [
  { id: 1, nombre: "Laptop", precio: 1200, stock: 5 },
  { id: 2, nombre: "Mouse", precio: 20, stock: 50 },
  { id: 3, nombre: "Teclado", precio: 35, stock: 30 },
  { id: 4, nombre: "Monitor", precio: 200, stock: 15 },
];

export default function ProductosPage() {
  const [filtro, setFiltro] = useState("");
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [productos, setProductos] = useState(productosIniciales);

  // Estados para el nuevo producto
  const [nuevo, setNuevo] = useState({ nombre: "", precio: 0, stock: 0 });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const productosFiltrados = productos
    .filter((p) =>
      p.nombre.toLowerCase().includes(filtro.toLowerCase())
    )
    .sort((a, b) =>
      ordenAscendente ? a.precio - b.precio : b.precio - a.precio
    );

  const toggleOrden = () => {
    setOrdenAscendente(!ordenAscendente);
  };

  const agregarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoProducto: Producto = {
      id: Date.now(), // ID único temporal
      nombre: nuevo.nombre,
      precio: nuevo.precio,
      stock: nuevo.stock,
    };
    setProductos([nuevoProducto, ...productos]);
    setNuevo({ nombre: "", precio: 0, stock: 0 });
    setMostrarFormulario(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Productos</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border px-4 py-2 rounded md:w-1/2"
        />
        <button
          onClick={toggleOrden}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ordenar por precio ({ordenAscendente ? "Asc" : "Desc"})
        </button>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {mostrarFormulario ? "Cancelar" : "Agregar producto"}
        </button>
      </div>

      {mostrarFormulario && (
        <form
          onSubmit={agregarProducto}
          className="bg-white p-4 border rounded shadow w-full md:w-1/2"
        >
          <h2 className="text-lg font-semibold mb-4">Nuevo Producto</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            required
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Precio"
            value={nuevo.precio}
            onChange={(e) =>
              setNuevo({ ...nuevo, precio: Number(e.target.value) })
            }
            required
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={nuevo.stock}
            onChange={(e) =>
              setNuevo({ ...nuevo, stock: Number(e.target.value) })
            }
            required
            className="w-full mb-4 px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Guardar
          </button>
        </form>
      )}

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{producto.nombre}</td>
              <td className="px-4 py-2">${producto.precio}</td>
              <td className="px-4 py-2">{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
