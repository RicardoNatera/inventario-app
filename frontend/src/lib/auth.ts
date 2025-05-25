export function getUsuarioDesdeToken(): { email: string; nombre: string } | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return { email: payload.email, nombre: payload.nombre };
}
