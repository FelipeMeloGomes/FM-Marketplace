"use client";

import { Check } from "lucide-react";
import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

interface SuccessProps {
  params: {
    sessionId: string;
  };
}
export default function Success({}: SuccessProps) {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearCart();
      console.log("Carrinho limpo após delay.");
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container my-10 space-y-4 flex flex-col items-center justify-center">
      <Check className="w-24 h-24 text-green-500" />
      <h1 className="text-2xl">Obrigado e Parabéns pela Compra.</h1>
    </div>
  );
}
