"use client";

import { X, Trash2 } from "lucide-react";
import { useCart } from "@/stores/cart";
import { useState } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, total } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image_url: i.product.image_url,
          })),
        }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch {
      alert("erro ao processar pagamento. tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-marrom/30 backdrop-blur-sm z-50"
          onClick={closeCart}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-creme z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-marrom/10">
            <h2 className="font-display text-xl font-light text-marrom">
              sua sacola
            </h2>
            <button
              onClick={closeCart}
              className="text-marrom/50 hover:text-marrom transition-colors"
              aria-label="fechar sacola"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <p className="text-marrom/50 text-sm text-center mt-12">
                sua sacola esta vazia.
              </p>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 items-start"
                  >
                    <div
                      className="w-20 h-20 bg-bege/50 rounded-lg flex-shrink-0 bg-cover bg-center"
                      style={{
                        backgroundImage: item.product.image_url
                          ? `url(${item.product.image_url})`
                          : undefined,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm text-marrom">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-marrom/50 mt-1">
                        peça única
                      </p>
                      <p className="text-sm font-medium text-marrom mt-2">
                        R$ {item.product.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-marrom/30 hover:text-pink transition-colors"
                      aria-label="remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-marrom/10 space-y-4">
              <div className="flex justify-between text-marrom">
                <span className="text-sm">total</span>
                <span className="font-display text-lg">
                  R$ {total().toFixed(2).replace(".", ",")}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-marrom text-creme py-3.5 text-sm tracking-wide hover:bg-pink transition-colors disabled:opacity-50 rounded-full"
              >
                {loading ? "processando..." : "finalizar pedido"}
              </button>
              <p className="text-[11px] text-marrom/40 text-center">
                pagamento seguro via mercado pago
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
