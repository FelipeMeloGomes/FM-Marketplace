"use client";

import { useState } from "react";
import { Product } from "../../../types";
import ProductCard from "./product-card";

interface Props {
  products: Product[];
}

export default function ProductFilter({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="p-4">
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      />

      {filteredProducts.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </section>
      )}
    </section>
  );
}
