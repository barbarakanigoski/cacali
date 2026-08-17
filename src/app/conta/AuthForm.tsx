"use client";

import { useState } from "react";

export function AuthForm() {
  const [mode, setMode] = useState<"login" | "cadastro" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "reset") {
        const { resetPassword } = await import("@/lib/auth");
        const { error } = await resetPassword(email);
        if (error) throw error;
        setSuccess("e-mail de recuperação enviado. confere a caixa de entrada.");
      } else if (mode === "cadastro") {
        const { signUp } = await import("@/lib/auth");
        const { error } = await signUp(email, password, name);
        if (error) throw error;
        setSuccess("conta criada! confere seu e-mail pra confirmar.");
      } else {
        const { signIn } = await import("@/lib/auth");
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "algo deu errado.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-md mx-auto px-6">
        <h1 className="text-4xl font-bold text-marrom text-center">
          {mode === "login" && "entrar"}
          {mode === "cadastro" && "criar conta"}
          {mode === "reset" && "recuperar senha"}
        </h1>
        <p className="text-marrom/50 text-center mt-3 text-sm">
          {mode === "login" && "acesse sua conta pra acompanhar seus pedidos."}
          {mode === "cadastro" && "crie sua conta pra fazer parte da cacali."}
          {mode === "reset" && "sem problema. a gente te ajuda."}
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {mode === "cadastro" && (
            <div>
              <label className="text-sm text-marrom/60 block mb-2">nome</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-sm text-marrom/60 block mb-2">e-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors"
            />
          </div>

          {mode !== "reset" && (
            <div>
              <label className="text-sm text-marrom/60 block mb-2">senha</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-marrom/10 rounded-xl px-4 py-3 text-marrom text-sm focus:outline-none focus:border-pink/50 transition-colors"
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-pink bg-pink/10 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-marrom bg-bege rounded-xl px-4 py-3">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-marrom text-creme py-3.5 text-sm font-semibold tracking-wide hover:bg-pink transition-colors rounded-full disabled:opacity-50"
          >
            {loading
              ? "aguarde..."
              : mode === "login"
                ? "entrar"
                : mode === "cadastro"
                  ? "criar conta"
                  : "enviar e-mail"}
          </button>
        </form>

        <div className="mt-8 text-center space-y-3 text-sm">
          {mode === "login" && (
            <>
              <button
                onClick={() => setMode("reset")}
                className="text-marrom/50 hover:text-pink transition-colors block mx-auto"
              >
                esqueceu a senha?
              </button>
              <p className="text-marrom/40">
                não tem conta?{" "}
                <button
                  onClick={() => setMode("cadastro")}
                  className="text-pink font-semibold hover:underline"
                >
                  criar agora
                </button>
              </p>
            </>
          )}
          {mode === "cadastro" && (
            <p className="text-marrom/40">
              já tem conta?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-pink font-semibold hover:underline"
              >
                entrar
              </button>
            </p>
          )}
          {mode === "reset" && (
            <button
              onClick={() => setMode("login")}
              className="text-marrom/50 hover:text-pink transition-colors"
            >
              voltar pro login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
