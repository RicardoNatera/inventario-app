"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { baseURL } from "@/lib/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", data.access_token);
      router.push("/productos");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <>
    <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Ingresar
      </button>
    </form>
    <p className="text-center mt-4 text-sm">
      ¿No tienes cuenta? <Link href="/register" className="text-blue-600 underline">Regístrate aquí</Link>
    </p>
    </>
  );
}
