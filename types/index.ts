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
