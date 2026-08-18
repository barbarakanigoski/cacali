"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/stores/cart";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { AdminEditButton } from "@/components/admin/AdminEditButton";
import { AdminSidebar, type SectionField } from "@/components/admin/AdminSidebar";
import { getSiteTexts, saveSiteTexts } from "@/lib/site-config";

const keys = [
  "header_bg", "header_link_color", "header_logo_image",
  "header_height", "header_badge_color",
];

const defaults: Record<string, string> = {
  header_bg: "#5A1B09",
  header_link_color: "#FFFFFFb3",
  header_logo_image: "/logo-full-horizontal.png",
  header_height: "80",
  header_badge_color: "#E63B6F",
};

const navLinks = [
  { href: "/", label: "home" },
  { href: "/pecas", label: "peças" },
  { href: "/encomendas", label: "encomendas" },
  { href: "/sobre", label: "sobre" },
];

export function Header() {
  const toggleCart = useCart((s) => s.toggleCart);
  const count = useCart((s) => s.count);
  const [t, setT] = useState(defaults);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<Record<string, string> | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    getSiteTexts(keys).then((data) => setT({ ...defaults, ...data }));
  }, []);

  const v = preview || t;

  function buildFields(): SectionField[] {
    return [
      { key: "header_bg", label: "Cor de fundo", value: v.header_bg, type: "color", group: "cor" },
      { key: "header_link_color", label: "Cor dos links", value: v.header_link_color, type: "color", group: "cor" },
      { key: "header_badge_color", label: "Cor do badge carrinho", value: v.header_badge_color, type: "color", group: "cor" },
      { key: "header_height", label: "Altura do menu", value: v.header_height, type: "range", group: "layout", min: 48, max: 120, unit: "px" },
      { key: "header_logo_image", label: "Logo", value: v.header_logo_image, type: "image", group: "imagem" },
    ];
  }

  async function handleSave(fields: SectionField[]) {
    const updated: Record<string, string> = {};
    for (const f of fields) updated[f.key] = f.value;
    await saveSiteTexts(updated);
    setT({ ...t, ...updated });
    setPreview(null);
  }

  function handlePreview(fields: SectionField[]) {
    const p: Record<string, string> = {};
    for (const f of fields) p[f.key] = f.value;
    setPreview({ ...t, ...p });
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: v.header_bg }}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center" style={{ height: `${v.header_height}px` }}>
          {/* Desktop nav */}
          <div className="flex-1 items-center gap-4 lg:gap-8 hidden md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-semibold hover:opacity-100 transition-opacity" style={{ color: v.header_link_color }}>
                {link.label}
              </Link>
            ))}
            <a href="https://instagram.com/cacali.ceramica" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:opacity-100 transition-opacity" style={{ color: v.header_link_color }}>
              instagram
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex-1 md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 -ml-2 hover:opacity-100 transition-opacity"
              style={{ color: v.header_link_color }}
              aria-label="menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="relative flex items-center">
            <Link href="/">
              <Image src={v.header_logo_image} alt="cacali cerâmica artesanal" width={180} height={50} className="h-8 sm:h-10 md:h-12 w-auto brightness-0 invert" />
            </Link>
            <AdminEditButton onClick={() => setEditing(true)} position="inline" />
          </div>

          {/* Right icons */}
          <div className="flex-1 flex items-center justify-end gap-4 sm:gap-6">
            <Link href="/conta" className="p-2 hover:opacity-100 transition-opacity" style={{ color: v.header_link_color }} aria-label="minha conta">
              <User size={22} />
            </Link>
            <button onClick={toggleCart} className="relative p-2 hover:opacity-100 transition-opacity" style={{ color: v.header_link_color }} aria-label="abrir sacola">
              <ShoppingBag size={22} />
              {count() > 0 && (
                <span className="absolute top-0.5 right-0 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: v.header_badge_color }}>
                  {count()}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden overflow-hidden border-t border-white/10"
              style={{ backgroundColor: v.header_bg }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-semibold py-3 px-3 rounded-xl hover:bg-white/10 transition-colors"
                    style={{ color: v.header_link_color }}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://instagram.com/cacali.ceramica"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold py-3 px-3 rounded-xl hover:bg-white/10 transition-colors"
                  style={{ color: v.header_link_color }}
                >
                  instagram
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {editing && (
          <AdminSidebar title="editar menu" fields={buildFields()} onSave={handleSave} onPreview={handlePreview} onClose={() => { setEditing(false); setPreview(null); }} />
        )}
      </header>
      <CartDrawer />
    </>
  );
}
