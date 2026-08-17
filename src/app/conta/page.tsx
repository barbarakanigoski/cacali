"use client";

import { useAuth } from "@/stores/auth";
import { AuthForm } from "./AuthForm";
import { AccountPanel } from "./AccountPanel";

export default function ContaPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <p className="text-marrom/50 text-sm">carregando...</p>
      </div>
    );
  }

  return user ? <AccountPanel /> : <AuthForm />;
}
