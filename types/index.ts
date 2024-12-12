export interface Product {
  id: string;
  name: string;
  description?: string;
  price: string | number;
  currency: string;
  image: string;
  images?: string[];
}

export interface ShippingOption {
  id: string;
  company: {
    name: string;
  };
  price: number;
  delivery_time: string;
}

export interface ShippingCalculatorProps {
  onShippingChange: (option: ShippingOption) => void;
}

export interface CepInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
