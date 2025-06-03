"use client";
import React from "react";

interface Props {
  q: string;
  minPrecio: string;
  maxPrecio: string;
  stockMenorA: string;
  setQ: (val: string) => void;
  setMinPrecio: (val: string) => void;
  setMaxPrecio: (val: string) => void;
  setStockMenorA: (val: string) => void;
  setPage: (val: number) => void;
}

export default function FiltrosProductos({
  q,
  minPrecio,
  maxPrecio,
  stockMenorA,
  setQ,
  setMinPrecio,
  setMaxPrecio,
  setStockMenorA,
  setPage,
}: Props) {
  return (
      <>      
        <input
        type="text"
        placeholder="Buscar por nombre..."
        value={q}
        onChange={(e) => {
          setPage(1);
          setQ(e.target.value);
        }}
        className="col-span-12 md:col-span-3 border px-2 py-1 rounded"
      />
      <input
        type="number"
        placeholder="Stock menor a..."
        value={stockMenorA}
        onChange={(e) => {
          setPage(1);
          setStockMenorA(e.target.value);
        }}
        className="col-span-4 md:col-span-3 border px-2 py-1 rounded"
      />
      <input
        type="number"
        placeholder="Precio mínimo"
        value={minPrecio}
        onChange={(e) => {
          setPage(1);
          setMinPrecio(e.target.value);
        }}
        className="col-span-4 md:col-span-3 border px-2 py-1 rounded"
      />
      <input
        type="number"
        placeholder="Precio máximo"
        value={maxPrecio}
        onChange={(e) => {
          setPage(1);
          setMaxPrecio(e.target.value);
        }}
        className="col-span-4 md:col-span-3 border px-2 py-1 rounded"
      />
    </>
  );
}
