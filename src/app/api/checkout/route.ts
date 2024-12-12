import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Product } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities";
import { CartItem } from "../../../../types";

export async function POST(request: NextRequest) {
  const { cartDetails, shippingOption } = await request.json();
  const baseUrl = request.headers.get("origin");

  if (!shippingOption || !shippingOption.price) {
    return NextResponse.json(
      { error: "Selecione uma opção de frete válida." },
      { status: 400 },
    );
  }

  const stripeInventory = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = stripeInventory.data.map((p: Stripe.Product): Product => {
    return {
      id: p.id.toString(),
      name: p.name,
      price: (p.default_price as Stripe.Price)?.unit_amount ?? 0,
      currency: (p.default_price as Stripe.Price)?.currency ?? "BRL",
      image: p.images[0],
    };
  });

  const line_items = validateCartItems(products, cartDetails);

  let totalCartValueInCents = 0;

  for (const item of Object.values(cartDetails) as CartItem[]) {
    totalCartValueInCents += item.value * item.quantity;
  }

  const shippingPriceInCents = Math.round((shippingOption.price || 0) * 100);

  line_items.push({
    price_data: {
      currency: "brl",
      product_data: {
        name: `Frete - ${shippingOption.company.name}`,
      },
      unit_amount: shippingPriceInCents,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card", "boleto"],
    line_items: line_items,
    success_url: `${baseUrl}/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cart`,
  });

  return NextResponse.json(session, { status: 200 });
}
