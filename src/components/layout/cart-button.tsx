"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function CartButton() {
  const { cartCount } = useShoppingCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link href={"/cart"} className="flex items-center justify-center gap-2">
      <ShoppingCart className="font-extrabold h-6 w-6" />
      {isClient ? (
        <>
          <p className="text-wind">{cartCount}</p> Produto(s)
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      )}
    </Link>
  );
}
