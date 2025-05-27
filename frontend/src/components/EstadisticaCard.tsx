"use client";

interface Props {
  titulo: string;
  valor: number | string;
  color?: string;
  icono?: React.ReactNode;
}

export default function EstadisticaCard({ titulo, valor, color = "text-blue-600", icono }: Props) {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center justify-between">
      <div>
        <h2 className="text-gray-600">{titulo}</h2>
        <p className={`text-3xl font-bold ${color}`}>{valor}</p>
      </div>
      {icono && <div className="text-3xl opacity-30">{icono}</div>}
    </div>
  );
}