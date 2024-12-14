import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShippingOption } from "../../types";

interface UseShippingCalculatorParams {
  onShippingChange?: (option: ShippingOption) => void;
}

export default function useShippingCalculator({
  onShippingChange,
}: UseShippingCalculatorParams) {
  const [postalCode, setPostalCode] = useState<string>("");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingOption | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleCalculateShipping = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/calculate-shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: { postal_code: "7564000" },
          to: { postal_code: postalCode },
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
              quantity: 1,
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
          title: "Erro",
          description: "Erro ao calcular frete. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      toast({
        title: "Erro",
        description: "Erro ao calcular frete. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShippingSelect = (option: ShippingOption) => {
    setSelectedShipping(option);
    if (onShippingChange) {
      onShippingChange(option);
    }
  };

  return {
    postalCode,
    setPostalCode,
    shippingOptions,
    selectedShipping,
    isLoading,
    handleCalculateShipping,
    handleShippingSelect,
  };
}
