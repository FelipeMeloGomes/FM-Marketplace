"use client";
import { Button } from "@/components/ui/button";
import useShippingCalculator from "@/hooks/use-shipping-calculator";
import { CheckCircle } from "lucide-react";
import { ShippingCalculatorProps } from "../../../types";
import ShippingInput from "./shipping-input";

export default function ShippingCalculator({
  onShippingChange,
}: ShippingCalculatorProps) {
  const {
    postalCode,
    setPostalCode,
    shippingOptions,
    selectedShipping,
    isLoading,
    handleCalculateShipping,
    handleShippingSelect,
  } = useShippingCalculator({ onShippingChange });

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

        <ShippingInput
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>

      <div className="mt-4">
        {shippingOptions
          .filter((option) => Number(option.price) > 0)
          .map((option) => (
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
                {parseInt(option.delivery_time) > 0 && (
                  <div>
                    <strong>{option.company.name}</strong>: R$ {option.price} -{" "}
                    {option.delivery_time} dias úteis
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
