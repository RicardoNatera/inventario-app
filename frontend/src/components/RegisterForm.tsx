"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/lib/api";

export default function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [rol, setRol] = useState("USER");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(`${baseURL}/auth/register`, {
        nombre,
        email,
        password,
        rol,
      });

      localStorage.setItem("token", data.access_token);
      router.push("/productos");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <label className="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="w-full px-3 py-2 mb-4 border rounded"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Correo electrónico</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-3 py-2 mb-4 border rounded"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-3 py-2 mb-4 border rounded"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Rol</label>
      <select
        value={rol}
        onChange={(e) => setRol(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded"
      >
        <option value="USER">Usuario</option>
        <option value="ADMIN">Administrador</option>
      </select>


      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Registrarse
      </button>
    </form>
  );
}
