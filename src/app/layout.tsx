import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Dekko } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dekko = Dekko({
  variable: "--font-dekko",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "cacali - ceramica autoral por barbara kanigoski",
  description:
    "ceramica autoral feita a mao. cada peca e unica — como quem a recebe.",
  openGraph: {
    title: "cacali - ceramica autoral",
    description:
      "ceramica autoral feita a mao. cada peca e unica — como quem a recebe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${dmSans.variable} ${dekko.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
