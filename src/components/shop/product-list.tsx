import stripe from "@/lib/stripe";
import Stripe from "stripe";
import { Product } from "../../../types";
import ProductFilter from "./product-filter";

async function getProducts() {
  try {
    const stripProducts = await stripe.products.list({
      limit: 100,
      expand: ["data.default_price"],
    });

    return stripProducts.data.map((p: Stripe.Product): Product => {
      return {
        id: p.id.toString(),
        name: p.name,
        description: p.description ?? "",
        price: (p.default_price as Stripe.Price).unit_amount_decimal ?? 0,
        currency: (p.default_price as Stripe.Price)?.currency ?? "BRL",
        images: p.images,
        image: p.images[0],
      };
    });
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default async function ProductList() {
  const products = await getProducts();
  return <ProductFilter products={products} />
    
}
