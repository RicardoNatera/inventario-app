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
}


export default function FormularioProducto({
  datos,
  setDatos,
  onSubmit,
  modoEdicion,
  cancelarEdicion,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre del producto</label>
        <input
          type="text"
          value={datos.nombre}
          onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Precio</label>
        <input
          type="number"
          value={datos.precio}
          onChange={(e) => setDatos({ ...datos, precio: parseFloat(e.target.value) })}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stock</label>
        <input
          type="number"
          value={datos.stock}
          onChange={(e) => setDatos({ ...datos, stock: parseInt(e.target.value) })}
          required
          className="w-full border px-3 py-2 rounded"
        />
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
