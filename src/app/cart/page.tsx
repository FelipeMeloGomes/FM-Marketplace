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
import { cn } from "@/lib/utils";
import { Loader, MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function Cart() {
  const {
    cartCount,
    cartDetails,
    redirectToCheckout,
    removeItem,
    decrementItem,
    clearCart,
    incrementItem,
  } = useShoppingCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function checkout() {
    setIsCheckingOut(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartDetails),
    });

    const { id } = await response.json();

    const result = await redirectToCheckout(id);
    setIsCheckingOut(false);
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
        Object.keys(cartDetails).map((key) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="tracking-wider">
                {cartDetails[key].name} ({cartDetails[key].quantity})
              </CardTitle>
              <CardDescription className="text-md tracking-wide">
                {cartDetails[key].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex flex-col items-center gap-4 justify-between space-x-4 sm:flex-row sm:gap ">
                <div className="flex items-center space-x-4 ">
                  <div className="relative w-28 h-28">
                    <Image
                      priority
                      src={cartDetails[key].image || ""}
                      fill
                      alt={cartDetails[key].name}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-md font-medium leading-none">Preço</p>
                    <p className="text-md text-muted-foreground">
                      {cartDetails[key].formattedValue}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 ">
                  <MinusCircle
                    className="text-blue-400 hover:text-blue-600 cursor-pointer"
                    onClick={() =>
                      handleRemoveOneItem(key, cartDetails[key].quantity)
                    }
                  />
                  <div className="flex flex-col items-center">
                    <p className="text-md tracking-wide">Qtdd</p> (
                    {cartDetails[key].quantity})
                  </div>
                  <PlusCircle
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                    onClick={() => handleIncrementItem(key)}
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-md font-medium leading-none">Preço</p>
                    <p className="text-bold tracking-wide text-green-800">
                      {" "}
                      {cartDetails[key].formattedValue}
                    </p>
                  </div>
                  <Trash2
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                    onClick={() => handleRemoveItem(key)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
      <div
        className={cn(
          "flex  flex-col items-center justify-between gap-5 sm:flex-row sm:w-full",
          cartCount === undefined || cartCount <= 0 ? "hidden" : "",
        )}
      >
        <ShippingCalculator />
        <div className="flex  space-x-4 ">
          <Button
            variant={"default"}
            onClick={handleClearCart}
            size={"lg"}
            disabled={isCheckingOut}
          >
            Limpar Carrinho
          </Button>
          <Button
            variant={"default"}
            size={"lg"}
            onClick={checkout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? (
              <div className="flex items-center justify-between gap-2">
                <Loader className="animate-spin 2s repeat-infinite" />{" "}
                Finalizando...
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
