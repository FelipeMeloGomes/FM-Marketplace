"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { ShippingOption } from "../../../types";

export default function ShippingCalculator() {
  const [postalCode, setPostalCode] = useState<string>("");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOption | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cepRegex = /^\d{8}$/;
  const { toast } = useToast();

  const handleCalculateShipping = async () => {
    if (!postalCode || !cepRegex.test(postalCode)) {
      toast({
        title: "CEP inválido",
        description: "Por favor, insira um CEP válido no formato 00000-000.",
        variant: "destructive",
      });

      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/calculate-shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: {
            postal_code: "7564000",
          },
          to: {
            postal_code: postalCode,
          },
          products: [
            {
              id: "x",
              width: 11,
              height: 17,
              length: 11,
              weight: 0.3,
              insurance_value: 10.1,
              quantity: 1,
            },
            {
              id: "y",
              width: 16,
              height: 25,
              length: 11,
              weight: 0.3,
              insurance_value: 55.05,
              quantity: 2,
            },
            {
              id: "z",
              width: 22,
              height: 30,
              length: 11,
              weight: 1,
              insurance_value: 30,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShippingOptions(data.shippingOptions);
      } else {
        toast({
          title: "Error",
          description: "Erro ao calcular frete. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      toast({
        title: "Error",
        description: "Erro ao calcular frete. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShippingSelect = (option: ShippingOption) => {
    setSelectedShipping(option);
  };

  return (
    <div className="space-x-4 gap-5">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Button
          onClick={handleCalculateShipping}
          variant={"default"}
          size={"lg"}
          disabled={isLoading}
        >
          {isLoading ? "Calculando..." : "Calcular Frete"}
        </Button>
        <Input
          id="postal-code"
          type="number"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="CEP* - 0000-0000"
        />
      </div>

      <div className="mt-4">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className={`text-sm flex justify-between items-center space-x-2 p-2 rounded-md cursor-pointer ${
              selectedShipping?.id === option.id
                ? "bg-blue-200"
                : "hover:bg-gray-300"
            }`}
            onClick={() => handleShippingSelect(option)}
          >
            {selectedShipping?.id === option.id && (
              <span className="text-green-500 flex items-center">
                <CheckCircle className="mr-1" />
                Selecionado
              </span>
            )}
            <div>
              <strong>{option.company.name}</strong>: R$ {option.price} -{" "}
              {option.delivery_time} dias úteis
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
