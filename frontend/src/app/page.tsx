"use client";

import { useEffect, useState } from "react";
import { obtenerProductos } from "@/lib/api";
import { Producto } from "@/interfaces/producto";
import { getUsuarioDesdeToken } from "@/lib/auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function HomePage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const usuario = getUsuarioDesdeToken();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await obtenerProductos();
      setProductos(data);
    };
    fetch();
  }, []);

  const total = productos.length;
  const enOferta = productos.filter(p => p.precio < 20).length;
  const stockTotal = productos.reduce((acc, p) => acc + p.stock, 0);

  const totalEnOferta = productos.filter(p => p.precio < 20).length;
  const totalNormales = productos.length - totalEnOferta;

  const dataTorta = [
    { name: "En oferta", value: totalEnOferta },
    { name: "Precio normal", value: totalNormales },
  ];

  const colores = ["#f43f5e", "#10b981"]; // rojo para oferta, verde para normales

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Bienvenido{usuario?.nombre && `, ${usuario.nombre}`} ({usuario?.rol})
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-600">Total de productos</h2>
          <p className="text-3xl font-bold text-blue-600">{total}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-600">En oferta (menos de $20)</h2>
          <p className="text-3xl font-bold text-red-500">{enOferta}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-gray-600">Stock total acumulado</h2>
          <p className="text-3xl font-bold text-green-600">{stockTotal}</p>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-yellow-700">
          Productos que requieren reabastecimiento (stock menor a 100)
        </h2>

        {productos.filter(p => p.stock < 100).length === 0 ? (
          <p className="text-gray-500">Todos los productos tienen suficiente stock por ahora.</p>
        ) : (
          <table className="w-full bg-white shadow rounded text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Nombre</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {productos
                .filter(p => p.stock < 100)
                .sort((a, b) => a.stock - b.stock)
                .slice(0, 3)
                .map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{p.nombre}</td>
                    <td className="p-2">${p.precio}</td>
                    <td className="p-2 text-red-600 font-semibold">{p.stock}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </section>
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Productos con más stock</h2>
        <div className="bg-white p-4 rounded shadow">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productos.slice(0, 8).sort((a, b) => b.stock - a.stock)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Distribución de productos en oferta</h2>
        <div className="bg-white p-4 rounded shadow">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataTorta}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {dataTorta.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

    </div>
  );
}
