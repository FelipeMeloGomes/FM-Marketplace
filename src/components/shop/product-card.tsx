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
import { ShoppingCart } from "lucide-react";

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
      <CardDescription className="relative h-60 w-full ">
        <Image
          src={image}
          sizes="100%"
          fill
          alt={name}
          className="object-contain "
        />
      </CardDescription>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="mt-2 text-lg font-bold">{formattedPrice}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size={"lg"}
          variant={"default"}
          onClick={addToCart}
          disabled={isAdding}
          aria-label={`Adicionar ${name} ao carrinho`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />{" "}
          {isAdding ? "Adicionando..." : "Comprar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
