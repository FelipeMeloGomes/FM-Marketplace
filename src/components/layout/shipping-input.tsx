import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { CepInputProps } from "../../../types";

export default function ShippingInput({ value, onChange }: CepInputProps) {
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    newValue = newValue.replace(/\D/g, "");

    if (newValue.length > 5) {
      newValue = newValue.slice(0, 5) + "-" + newValue.slice(5, 8);
    }

    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    };

    onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);

    if (newValue.length === 9 && /^[0-9]{5}-[0-9]{3}$/.test(newValue)) {
      setError("");
    } else if (newValue.length === 9) {
      setError("CEP inválido.");
    } else {
      setError("");
    }
  };

  const handleBlur = () => {
    if (!/^[0-9]{5}-[0-9]{3}$/.test(value)) {
      setError("CEP inválido.");
    }
  };

  return (
    <>
      <Input
        type="text"
        id="postal-code"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="Digite o CEP (XXXXX-XXX)"
        maxLength={9}
      />
      {error && <p className="text-red-800">{error}</p>}
    </>
  );
}
