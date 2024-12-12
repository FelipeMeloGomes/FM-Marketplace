"use client";

import { CartProvider } from "use-shopping-cart";
import { AppCartProviderProps } from "../../../types";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

export default function AppCartProvider({ children }: AppCartProviderProps) {
  return (
    <CartProvider
      shouldPersist={true}
      cartMode="checkout-session"
      stripe={stripeKey}
      currency="BRL"
    >
      {children}
    </CartProvider>
  );
}
