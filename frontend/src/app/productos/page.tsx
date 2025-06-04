"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  obtenerProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
  api,
} from "@/lib/api";
import { toast } from "react-toastify";
import { showConfirmModal } from "@/components/ui/ConfirmModal";
import { Producto } from "@/interfaces/producto";
import FiltrosProductos from "@/components/productos/FiltrosProductos";
import TablaProductos from "@/components/productos/TablaProductos";
import FormularioProducto from "@/components/productos/FormularioProducto";

export default function ProductosPage() {
  const router = useRouter();

  const [rol, setRol] = useState("USER");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [minPrecio, setMinPrecio] = useState("");
  const [maxPrecio, setMaxPrecio] = useState("");
  const [stockMenorA, setStockMenorA] = useState("");

  const [nuevo, setNuevo] = useState({ nombre: "", precio: 0, stock: 0 });
  const [mostrarFormCrear, setMostrarFormCrear] = useState(false);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [datosEdicion, setDatosEdicion] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
  });

const toggleOrden = () => {
  const ordenados = [...productos].sort((a, b) =>
    ordenAscendente ? a.precio - b.precio : b.precio - a.precio
  );
  setProductos(ordenados);
  setOrdenAscendente(!ordenAscendente);
};

  const iniciarEdicion = (producto: Producto) => {
    setEditandoId(producto.id);
    setDatosEdicion({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
    });
    setMostrarFormCrear(false);
  };

  const descargarArchivo = async (tipo: "excel" | "pdf") => {
    try {
      const params: any = {};
      if (q) params.q = q;
      if (minPrecio) params.minPrecio = minPrecio;
      if (maxPrecio) params.maxPrecio = maxPrecio;
      if (stockMenorA) params.stockMenorA = stockMenorA;

      const res = await api.get(`/productos/${tipo}`, {
        params,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `productos.${tipo === "excel" ? "xlsx" : "pdf"}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error(`Error al descargar archivo ${tipo.toUpperCase()}`);
    }
  };

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: creado } = await crearProducto(nuevo);
      setProductos([creado, ...productos]);
      setNuevo({ nombre: "", precio: 0, stock: 0 });
      setMostrarFormCrear(false);
      toast.success("✅ Producto creado con éxito");
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.warn("⚠️ " + error.response.data.message);
      } else {
        console.error(error);
        toast.error("❌ Error al crear producto.");
      }
    }
  };

  const handleEditar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editandoId === null) return;

    try {
      const { data: actualizado } = await editarProducto(
        editandoId,
        datosEdicion
      );
      setProductos(
        productos.map((p) => (p.id === editandoId ? actualizado : p))
      );
      setEditandoId(null);
      toast.success("✏️ Producto actualizado con éxito");
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.warn("⚠️ " + error.response.data.message);
      } else {
        console.error(error);
        toast.error("❌ Error al editar producto");
      }
    }
  };

  const handleEliminar = async (id: number) => {
    showConfirmModal({
        title: "¿Eliminar producto?",
        message: "¿Deseas eliminar este producto permanentemente?",
        confirmText: "Sí, eliminar",
        cancelText: "Cancelar",
        onConfirm:  async () => {
          try {
            await eliminarProducto(id);
            setProductos(productos.filter((p) => p.id !== id));
            toast.success("🗑️ Producto eliminado con éxito");
          } catch (error) {
            console.error(error);
            toast.error("❌ Error al eliminar el producto");
          }
        },
    });    
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    setRol(payload.rol);

    const fetchProductos = async () => {
      try {
        const res = await obtenerProductos(
          q,
          page,
          5,
          minPrecio,
          maxPrecio,
          stockMenorA
        );
        setProductos(res.data);
        setTotalPaginas(res.totalPages);
        window.scrollTo({ top: 0, behavior: "smooth" });

      } catch (error) {
        console.error("Error al cargar productos:", error);
        toast.error("Error al cargar productos.");
      }
    };

    fetchProductos();
  }, [router, q, page, minPrecio, maxPrecio, stockMenorA]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Productos</h1>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-2">
        <div className="grid grid-cols-12 gap-2">
          <FiltrosProductos
            q={q}
            minPrecio={minPrecio}
            maxPrecio={maxPrecio}
            stockMenorA={stockMenorA}
            setQ={setQ}
            setMinPrecio={setMinPrecio}
            setMaxPrecio={setMaxPrecio}
            setStockMenorA={setStockMenorA}
            setPage={setPage}
          />
          <button
            onClick={toggleOrden}
            className="col-span-6 md:col-span-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ordenar por precio ({ordenAscendente ? "Asc" : "Desc"})
          </button>

          {rol === "ADMIN" && (
            <button 
              onClick={() => {
                setMostrarFormCrear(true);
                setEditandoId(null);
              }}
              className="col-span-6 md:col-span-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              ➕ Agregar producto
            </button>
          )}
        </div>

        {rol === "ADMIN" && (
          <div className="flex gap-2">
            <button
              onClick={() => descargarArchivo("excel")}
              className=" bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              📤 Exportar a Excel
            </button>
            <button
              onClick={() => descargarArchivo("pdf")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              🧾 Exportar a PDF
            </button>
          </div>
        )}
      </div>

      {mostrarFormCrear && !editandoId && (
        <FormularioProducto
          datos={nuevo}
          setDatos={setNuevo}
          onSubmit={handleCrear}
          modoEdicion={false}
          cancelarEdicion={() => {
            setMostrarFormCrear(false);
            setNuevo({ nombre: "", precio: 0, stock: 0 });
          }}
        />
        
      )}

      {editandoId !== null && (
        <FormularioProducto
          datos={datosEdicion}
          setDatos={setDatosEdicion}
          onSubmit={handleEditar}
          modoEdicion={true}
          cancelarEdicion={() => {
            setEditandoId(null);
            setDatosEdicion({ nombre: "", precio: 0, stock: 0 });
          }}
        />
      )}

      <TablaProductos
        productos={productos}
        rol={rol}
        abrirEditar={iniciarEdicion}
        eliminarProducto={handleEliminar}
      />

      <div className="flex gap-2 justify-center mt-4">
        {Array.from({ length: totalPaginas }, (_, i) => {
          const pagina = i + 1;
          const activa = pagina === page;

          return (
            <button
              key={pagina}
              onClick={() => !activa && setPage(pagina)}
              disabled={activa}
              className={`px-3 py-1 rounded border ${
                activa
                  ? "bg-blue-600 text-white cursor-default"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {pagina}
            </button>
          );
        })}
      </div>
    </div>
  );
}
