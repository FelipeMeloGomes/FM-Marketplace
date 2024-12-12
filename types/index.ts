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

export interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  sku?: string;
  price: string | number;
  currency: string;
  image: string;
  images?: string[];
}

export interface AppCartProviderProps {
  children: React.ReactNode;
}

export interface UserAuthFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface IUser {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

export interface SuccessProps {
  params: Promise<{ sessionId: string }>;
}

export interface CartItem {
  value: number;
  quantity: number;
}
