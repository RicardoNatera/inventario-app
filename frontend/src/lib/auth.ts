export function getUsuarioDesdeToken() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return {
    id: payload.sub,
    email: payload.email,
    nombre: payload.nombre,
    rol: payload.rol,
  };
}

