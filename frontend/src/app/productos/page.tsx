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

  // Estados para crear nuevo producto
  const [nuevo, setNuevo] = useState({ nombre: "", precio: 0, stock: 0 });
  const [mostrarFormCrear, setMostrarFormCrear] = useState(false);

  // Estados para editar
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEdicion, setDatosEdicion] = useState({ nombre: "", precio: 0, stock: 0 });

  // Filtrado y orden
  const productosFiltrados = productos
    .filter(p => p.nombre.toLowerCase().includes(filtro.toLowerCase()))
    .sort((a, b) =>
      ordenAscendente ? a.precio - b.precio : b.precio - a.precio
    );

  const toggleOrden = () => setOrdenAscendente(!ordenAscendente);

  // Crear
  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoProducto: Producto = {
      id: Date.now(),
      ...nuevo
    };
    setProductos([nuevoProducto, ...productos]);
    setNuevo({ nombre: "", precio: 0, stock: 0 });
    setMostrarFormCrear(false);
  };

  // Eliminar
  const handleEliminar = (id: number) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  // Preparar edición
  const iniciarEdicion = (p: Producto) => {
    setEditandoId(p.id);
    setDatosEdicion({ nombre: p.nombre, precio: p.precio, stock: p.stock });
  };

  // Guardar edición
  const handleEditar = (e: React.FormEvent) => {
    e.preventDefault();
    if (editandoId === null) return;
    setProductos(productos.map(p =>
      p.id === editandoId ? { id: p.id, ...datosEdicion } : p
    ));
    setEditandoId(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Productos</h1>

      {/* Controles */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          className="border px-4 py-2 rounded md:w-1/2"
        />
        <button
          onClick={toggleOrden}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ordenar por precio ({ordenAscendente ? "Asc" : "Desc"})
        </button>
        <button
          onClick={() => {
            setMostrarFormCrear(!mostrarFormCrear);
            setEditandoId(null);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {mostrarFormCrear ? "Cancelar creación" : "Agregar producto"}
        </button>
      </div>

      {/* Formulario Crear */}
      {mostrarFormCrear && (
        <form onSubmit={handleCrear} className="bg-white p-4 border rounded shadow w-full md:w-1/2">
            <h2 className="text-lg font-semibold mb-4">Nuevo Producto</h2>

            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
                type="text"
                value={nuevo.nombre}
                onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })}
                required
                className="w-full mb-4 px-3 py-2 border rounded"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input
                type="number"
                value={nuevo.precio}
                onChange={e => setNuevo({ ...nuevo, precio: Number(e.target.value) })}
                required
                className="w-full mb-4 px-3 py-2 border rounded"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
                type="number"
                value={nuevo.stock}
                onChange={e => setNuevo({ ...nuevo, stock: Number(e.target.value) })}
                required
                className="w-full mb-4 px-3 py-2 border rounded"
            />

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Guardar
            </button>
        </form>

      )}

      {/* Tabla */}
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-blue-100 text-left">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map(p => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{p.nombre}</td>
              <td className="px-4 py-2">${p.precio}</td>
              <td className="px-4 py-2">{p.stock}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => iniciarEdicion(p)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario Edición */}
      {editandoId !== null && (
        <form onSubmit={handleEditar} className="bg-white p-4 border rounded shadow w-full md:w-1/2">
            <h2 className="text-lg font-semibold mb-4">Editar Producto</h2>

            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
                type="text"
                value={datosEdicion.nombre}
                onChange={e => setDatosEdicion({ ...datosEdicion, nombre: e.target.value })}
                required
                className="w-full mb-4 px-3 py-2 border rounded"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input
                type="number"
                value={datosEdicion.precio}
                onChange={e => setDatosEdicion({ ...datosEdicion, precio: Number(e.target.value) })}
                required
                className="w-full mb-4 px-3 py-2 border rounded"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
                type="number"
                value={datosEdicion.stock}
                onChange={e => setDatosEdicion({ ...datosEdicion, stock: Number(e.target.value) })}
                required
                className="w-full mb-4 px-3 py-2 border rounded"
            />

            <button type="submit" className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500">
                Guardar cambios
            </button>
        </form>

      )}
    </div>
);
}
