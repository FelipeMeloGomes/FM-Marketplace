"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { SuccessProps } from "../../../../types";

export default function Success({ params }: SuccessProps) {
  const { clearCart } = useShoppingCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setSessionId(resolvedParams.sessionId);
    });
    const timeout = setTimeout(() => {
      clearCart();
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
