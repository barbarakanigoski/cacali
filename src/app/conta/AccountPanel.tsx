"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/stores/auth";
import type { Order } from "@/types";

export function AccountPanel() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.name || "");
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"dados" | "pedidos">("dados");

  useEffect(() => {
    async function loadOrders() {
      if (!user?.email) return;
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data } = await supabase
          .from("orders")
          .select("*")
          .eq("customer_email", user.email)
          .order("created_at", { ascending: false });
        if (data) setOrders(data);
      } catch {
        // supabase not configured
      }
    }
    loadOrders();
  }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const { updateProfile } = await import("@/lib/auth");
      await updateProfile(name);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // error
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    const { signOut } = await import("@/lib/auth");
    await signOut();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-marrom">
            olá, {user?.user_metadata?.name || "você"}.
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-marrom/50 hover:text-pink transition-colors"
          >
            sair
          </button>
        </div>

        {/* tabs */}
        <div className="flex gap-1 bg-bege/50 rounded-full p-1 mb-8">
          <button
            onClick={() => setTab("dados")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-colors ${
              tab === "dados"
                ? "bg-marrom text-creme"
                : "text-marrom/60 hover:text-marrom"
            }`}
          >
            meus dados
          </button>
          <button
            onClick={() => setTab("pedidos")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-colors ${
              tab === "pedidos"
                ? "bg-marrom text-creme"
                : "text-marrom/60 hover:text-marrom"
            }`}
          >
            meus pedidos
          </button>
        </div>

        {/* dados */}
        {tab === "dados" && (
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="text-sm text-marrom/60 block mb-2">nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-marrom/60 block mb-2">
                e-mail
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full bg-bege/30 border border-marrom/5 rounded-xl px-4 py-3 text-marrom/50 text-sm"
              />
            </div>

            {saved && (
              <p className="text-sm text-marrom bg-bege rounded-xl px-4 py-3">
                dados atualizados!
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-marrom text-creme px-8 py-3 text-sm font-semibold tracking-wide hover:bg-pink transition-colors rounded-full disabled:opacity-50"
            >
              {saving ? "salvando..." : "salvar alterações"}
            </button>
          </form>
        )}

        {/* pedidos */}
        {tab === "pedidos" && (
          <div>
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-marrom/50 text-sm">
                  nenhum pedido ainda.
                </p>
                <p className="text-marrom/30 text-xs mt-2">
                  quando você comprar uma peça, ela aparece aqui.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-marrom/5 rounded-2xl p-5 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-marrom">
                        Pedido #{order.id.slice(0, 8)}
                      </p>
                      <p className="text-xs text-marrom/50 mt-1">
                        {new Date(order.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-marrom">
                        R$ {order.total.toFixed(2).replace(".", ",")}
                      </p>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          order.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : order.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-bege text-marrom/60"
                        }`}
                      >
                        {order.status === "approved"
                          ? "aprovado"
                          : order.status === "rejected"
                            ? "recusado"
                            : "pendente"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
