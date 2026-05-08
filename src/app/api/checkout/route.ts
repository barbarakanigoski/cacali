import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();
    const { preference } = await import("@/lib/mercadopago");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const result = await preference.create({
      body: {
        items: items.map(
          (item: {
            id: string;
            name: string;
            price: number;
            quantity: number;
            image_url: string;
          }) => ({
            id: item.id,
            title: `cacali — ${item.name}`,
            unit_price: item.price,
            quantity: item.quantity,
            picture_url: item.image_url || undefined,
            currency_id: "BRL",
          })
        ),
        back_urls: {
          success: `${siteUrl}/pecas?status=success`,
          failure: `${siteUrl}/pecas?status=failure`,
          pending: `${siteUrl}/pecas?status=pending`,
        },
        auto_return: "approved",
        notification_url: `${siteUrl}/api/mercadopago-webhook`,
        statement_descriptor: "CACALI CERAMICA",
      },
    });

    return Response.json({ init_point: result.init_point });
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json(
      { error: "erro ao criar pagamento" },
      { status: 500 }
    );
  }
}
