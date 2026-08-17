"use client";

import { useAuth } from "@/stores/auth";
import { useState, useEffect } from "react";
import { ProductsManager } from "./ProductsManager";
import { HeroManager } from "./HeroManager";
import { SiteTextsManager } from "./SiteTextsManager";

const ADMIN_EMAILS = ["babikanigoski@gmail.com"];

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<"produtos" | "hero" | "textos">("produtos");

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <p className="text-marrom/50 text-sm">carregando...</p>
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <p className="text-marrom/50 text-sm">
          acesso restrito. faça login com a conta de administrador.
        </p>
      </div>
    );
  }

  const tabs = [
    { key: "produtos" as const, label: "Produtos" },
    { key: "hero" as const, label: "Hero / Carrossel" },
    { key: "textos" as const, label: "Textos do site" },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-marrom mb-2">painel admin</h1>
        <p className="text-sm text-marrom/50 mb-8">
          gerencie produtos, hero e textos do site.
        </p>

        <div className="flex gap-1 bg-bege/50 rounded-full p-1 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                tab === t.key
                  ? "bg-marrom text-creme"
                  : "text-marrom/60 hover:text-marrom"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "produtos" && <ProductsManager />}
        {tab === "hero" && <HeroManager />}
        {tab === "textos" && <SiteTextsManager />}
      </div>
    </div>
  );
}
