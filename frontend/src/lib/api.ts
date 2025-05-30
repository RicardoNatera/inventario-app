import axios from "axios";
import { Producto } from "@/interfaces/producto";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: agrega Authorization si hay token
api.interceptors.request.use((config) => {

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Métodos de productos
export async function obtenerProductos(
  q = '',
  page = 1,
  limit = 10,
  minPrecio?: string,
  maxPrecio?: string,
  stockMenorA?: string
) {
  const params: any = { q, page, limit };
  if (minPrecio) params.minPrecio = minPrecio;
  if (maxPrecio) params.maxPrecio = maxPrecio;
  if (stockMenorA) params.stockMenorA = stockMenorA;

  const res = await api.get("/productos", { params });
  return res.data;
}
export async function obtenerTodosLosProductos() {
  const res = await api.get("/productos"); // sin query params
  return res.data;
}
export const crearProducto = (producto: Omit<Producto, "id">) =>
  api.post<Producto>("/productos", producto);
export const editarProducto = (id: number, data: Partial<Omit<Producto, "id">>) =>
  api.put<Producto>(`/productos/${id}`, data);
export const eliminarProducto = (id: number) =>
  api.delete<Producto>(`/productos/${id}`);
