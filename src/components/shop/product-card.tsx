"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useMemo, useState } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { ProductCardProps } from "../../../types";

export default function ProductCard({
  id,
  name,
  description,
  price,
  currency,
  image,
}: ProductCardProps) {
  const { addItem } = useShoppingCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const formattedPrice = useMemo(() => {
    return formatCurrencyString({
      value: typeof price === "string" ? parseFloat(price) : price,
      currency,
      language: "pt-BR",
    });
  }, [price, currency]);

  async function addToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsAdding(true);

    try {
      addItem({
        name,
        description,
        id,
        price: typeof price === "string" ? parseFloat(price) : price,
        currency,
        image,
      });

      toast({
        title: `🎉 ${name} Adicionado`,
        description: "Adicione mais por descontos.",
      });
    } catch (error) {
      toast({
        title: "Erro ao adicionar ao carrinho",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center min-h-[4rem]">
          {name}
        </CardTitle>
        <CardDescription className="relative w-full h-60">
          <Image
            src={image || ""}
            fill
            sizes="100%"
            alt={name}
            className="object-contain"
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="min-h-[6rem]">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Preço</p>
          <p className="font-bold">{formattedPrice}</p>
        </div>
        <Button
          size={"lg"}
          variant={"default"}
          onClick={addToCart}
          disabled={isAdding}
          aria-label={`Adicionar ${name} ao carrinho`}
        >
          {isAdding ? "Adicionando..." : "Comprar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
