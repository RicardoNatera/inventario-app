"use client";

import React from "react";

type DatosProducto = {
  nombre: string;
  precio: number;
  stock: number;
};

interface Props {
  datos: DatosProducto;
  setDatos: (data: DatosProducto) => void;
  onSubmit: (e: React.FormEvent) => void;
  modoEdicion: boolean;
  cancelarEdicion: () => void;
  errores?: {
    nombre?: string;
    precio?: string;
    stock?: string;
  };
}


export default function FormularioProducto({
  datos,
  setDatos,
  onSubmit,
  modoEdicion,
  cancelarEdicion,
  errores = {}
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mb-6">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del producto
        </label>
        <input
          autoFocus
          id="nombre"
          type="text"
          aria-invalid={!!errores.nombre}
          value={datos.nombre}
          onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
          required
          className={`w-full mb-4 px-3 py-2 border rounded ${
            errores.nombre ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errores.nombre && (
          <p className="text-sm text-red-600 mt-1">{errores.nombre}</p>
        )}

      </div>

      <div>
        <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
          Precio
        </label>
        <input
          id="precio"
          type="number"
          aria-invalid={!!errores.precio}
          value={datos.precio}
          onChange={(e) => setDatos({ ...datos, precio: parseFloat(e.target.value) })}
          onFocus={e => {
            if (datos.precio === 0) {
              e.target.select();
            }
          }}
          required
          className={`w-full mb-4 px-3 py-2 border rounded ${
            errores.precio ? "border-red-500" : "border-gray-300"
          }`}
        />
        
        {errores.precio && (
          <p className="text-sm text-red-600 mt-1">{errores.precio}</p>
        )}
      </div>

      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          id="stock"
          type="number"
          aria-invalid={!!errores.stock}
          value={datos.stock}
          onChange={(e) => setDatos({ ...datos, stock: parseInt(e.target.value) })}
          onFocus={e => {
            if (datos.stock === 0) {
              e.target.select();
            }
          }}
          required
          className={`w-full mb-4 px-3 py-2 border rounded ${
            errores.stock ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errores.stock && (
          <p className="text-sm text-red-600 mt-1">{errores.stock}</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {modoEdicion ? "✏️ Actualizar" : "➕ Agregar"}
        </button>
        <button
            type="button"
            onClick={cancelarEdicion}
            className=" bg-red-600 text-white rounded hover:bg-red-700 px-4 py-2"
        >
            Cancelar
        </button>
        
      </div>
    </form>
  );
}
