import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MELHOR_ENVIO_KEY!}`,
        },
        body: JSON.stringify({
          from: body.from,
          to: body.to,
          products: body.products,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, shippingOptions: data });
    } else {
      return NextResponse.json(
        { success: false, message: data.message || "Erro ao consultar frete" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Erro ao consultar API do MelhorEnvio:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno no servidor" },
      { status: 500 },
    );
  }
}
