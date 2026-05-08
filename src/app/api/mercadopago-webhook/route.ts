import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type === "payment") {
      const paymentId = body.data?.id;

      if (paymentId) {
        const res = await fetch(
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
            },
          }
        );

        const payment = await res.json();

        if (payment.status === "approved") {
          try {
            const { supabase } = await import("@/lib/supabase");

            await supabase.from("orders").insert({
              payment_id: String(paymentId),
              status: "approved",
              total: payment.transaction_amount,
              customer_email: payment.payer?.email || "",
              customer_name:
                `${payment.payer?.first_name || ""} ${payment.payer?.last_name || ""}`.trim(),
            });

            const items = payment.additional_info?.items || [];
            for (const item of items) {
              await supabase
                .from("products")
                .update({ sold: true })
                .eq("id", item.id);
            }
          } catch (dbError) {
            console.error("Database update error:", dbError);
          }
        }
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json({ received: true });
  }
}
