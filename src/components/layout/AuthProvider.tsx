"use client";

import { useEffect } from "react";
import { useAuth } from "@/stores/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuth();

  useEffect(() => {
    async function init() {
      try {
        const { supabase } = await import("@/lib/supabase");
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
      } catch {
        // supabase not configured
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
