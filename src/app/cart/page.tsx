"use client";

import ShippingCalculator from "@/components/layout/shipping-calculator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader, MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

export default function Cart() {
  const {
    cartCount,
    cartDetails = {},
    redirectToCheckout,
    removeItem,
    decrementItem,
    clearCart,
    incrementItem,
  } = useShoppingCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<any | null>(null);
  const { toast } = useToast();
  const { status } = useSession();

  const totalPrice = useMemo(() => {
    const total = Object.keys(cartDetails).reduce(
      (sum, key) =>
        sum +
        (cartDetails[key]?.value ?? 0) * (cartDetails[key]?.quantity ?? 0),
      0,
    );

    return formatCurrencyString({
      value: total,
      currency: "BRL",
      language: "pt-BR",
    });
  }, [cartDetails]);

  const totalWithShipping = useMemo(() => {
    const shippingPriceInCents = Math.round(
      Number(selectedShipping?.price || 0) * 100,
    );
    const subtotalInCents = Object.keys(cartDetails).reduce(
      (sum, key) =>
        sum +
        (cartDetails[key]?.value ?? 0) * (cartDetails[key]?.quantity ?? 0),
      0,
    );

    const totalIncludingShipping = subtotalInCents + shippingPriceInCents;

    return formatCurrencyString({
      value: totalIncludingShipping,
      currency: "BRL",
      language: "pt-BR",
    });
  }, [cartDetails, selectedShipping]);

  async function checkout() {
    if (status !== "authenticated") {
      signIn();
      return;
    }

    if (!selectedShipping) {
      toast({
        title: "Oops",
        description: "Selecione uma opção de frete.",
        variant: "destructive",
      });

      return;
    }

    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartDetails,
          shippingOption: selectedShipping,
          total: totalWithShipping,
        }),
      });

      const { id } = await response.json();
      if (!id) {
        console.error("Erro ao obter ID da sessão de checkout");
        return;
      }
      await redirectToCheckout(id);
    } catch (error) {
      console.error("Erro ao finalizar o checkout:", error);
      alert("Houve um erro ao finalizar sua compra. Tente novamente.");
    } finally {
      setIsCheckingOut(false);
    }
  }

  function handleRemoveItem(itemId: string) {
    removeItem(itemId);
  }

  function handleClearCart() {
    clearCart();
  }

  function handleRemoveOneItem(itemId: string, currentQuantity: number) {
    if (currentQuantity > 1) {
      decrementItem(itemId);
    } else {
      removeItem(itemId);
    }
  }

  function handleIncrementItem(itemId: string) {
    incrementItem(itemId);
  }

  return (
    <section className="container flex flex-col my-2 space-y-2 mx-auto p-4">
      {cartCount === 0 ||
      !cartDetails ||
      Object.keys(cartDetails).length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600">
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          {Object.keys(cartDetails).map((key) => {
            const item = cartDetails[key];
            if (!item) return null;
            return (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="tracking-wider">
                    {item.name} ({item.quantity})
                  </CardTitle>
                  <CardDescription className="text-md tracking-wide">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex flex-col items-center gap-4 justify-between space-x-4 sm:flex-row sm:gap">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-28 h-28">
                        <Image
                          priority
                          src={item.image || ""}
                          fill
                          alt={item.name}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-md font-medium leading-none">
                          Preço
                        </p>
                        <p className="text-md text-muted-foreground">
                          {item.formattedValue}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-center">
                      <MinusCircle
                        className="text-blue-400 hover:text-blue-600 cursor-pointer"
                        onClick={() => handleRemoveOneItem(key, item.quantity)}
                      />
                      <div className="text-center">
                        <p className="text-md tracking-wide">Qtdd</p>
                        <p>{item.quantity}</p>
                      </div>
                      <PlusCircle
                        className="text-green-400 hover:text-green-600 cursor-pointer"
                        onClick={() => handleIncrementItem(key)}
                      />
                      <Trash2
                        className="text-red-400 hover:text-red-600 cursor-pointer"
                        onClick={() => handleRemoveItem(key)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <div className="text-right">
            <p>Subtotal: {totalPrice}</p>
            <p>
              Frete: {selectedShipping?.price ? selectedShipping.price : "0,00"}
            </p>
            <p className="font-bold">Total: {totalWithShipping}</p>
          </div>
        </>
      )}
      <div
        className={cn(
          "flex flex-col sm:flex-row sm:w-full justify-between items-center gap-4 sm:gap-5",
          cartCount === undefined || cartCount <= 0 ? "hidden" : "",
        )}
      >
        <ShippingCalculator onShippingChange={setSelectedShipping} />
        <div className="flex gap-4 w-full sm:w-auto justify-center">
          <Button
            variant={"default"}
            onClick={handleClearCart}
            size={"lg"}
            disabled={isCheckingOut}
            className="w-full sm:w-auto"
          >
            Limpar Carrinho
          </Button>
          <Button
            variant={"default"}
            size={"lg"}
            onClick={checkout}
            disabled={isCheckingOut}
            className="w-full sm:w-auto"
          >
            {isCheckingOut ? (
              <div className="flex items-center justify-between gap-2">
                <Loader className="animate-spin" /> Finalizando...
              </div>
            ) : (
              "Finalizar"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
