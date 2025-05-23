import axios from "axios";
import { Producto } from "../interfaces/producto";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Obtener todos los productos
export const obtenerProductos = () =>
  api.get<Producto[]>("/productos");

// Crear nuevo producto
export const crearProducto = (producto: Omit<Producto, "id">) =>
  api.post<Producto>("/productos", producto);

// Editar producto
export const editarProducto = (
  id: number,
  data: Partial<Omit<Producto, "id">>
) => api.put<Producto>(`/productos/${id}`, data);

// Eliminar producto
export const eliminarProducto = (id: number) =>
  api.delete<Producto>(`/productos/${id}`);
