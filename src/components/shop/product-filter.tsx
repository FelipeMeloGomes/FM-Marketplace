"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "../../../types";
import ProductCard from "./product-card";
import ProductSkeleton from "../ui/product-skeleton";

interface Props {
  products: Product[];
}

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 4;
const SKELETON_COUNT = 4;

export default function ProductFilter({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
            setIsLoadingMore(false);
          }, 1000);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [isLoadingMore]);
  return (
    <section className="p-4">
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      />

      {visibleProducts.length === 0 ? (
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <>
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}

            {isLoadingMore &&
              Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
          </section>

          {visibleCount < filteredProducts.length && (
            <div ref={loadMoreRef} className="h-10" />
          )}
        </>
      )}
    </section>
  );
}
