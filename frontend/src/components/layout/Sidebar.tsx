import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-full px-4 py-6 border-r">
      <nav className="flex flex-col space-y-4">
        <Link href="/" className="hover:underline">Inicio</Link>
        <Link href="/productos" className="hover:underline">Productos</Link>
        <Link href="/ofertas" className="hover:underline">Ofertas</Link>
      </nav>
    </aside>
  );
}
