"use client";

import { Pencil } from "lucide-react";
import { useAuth } from "@/stores/auth";

const ADMIN_EMAILS = ["babikanigoski@gmail.com"];

interface Props {
  onClick: () => void;
  position?: "absolute" | "inline";
}

export function AdminEditButton({ onClick, position = "absolute" }: Props) {
  const { user } = useAuth();
  const isAdmin = user && ADMIN_EMAILS.includes(user.email || "");

  if (!isAdmin) return null;

  if (position === "inline") {
    return (
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
        className="ml-2 bg-pink text-white p-1.5 rounded-full shadow-lg hover:bg-marrom hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100"
        title="editar seção"
      >
        <Pencil size={12} />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 z-50 bg-pink text-white p-2 rounded-full shadow-lg hover:bg-marrom hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100"
      title="editar seção"
    >
      <Pencil size={16} />
    </button>
  );
}
