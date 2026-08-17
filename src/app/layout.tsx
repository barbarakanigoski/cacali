import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { SmoothScroll } from "@/components/animations/SmoothScroll";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "cacali - cerâmica autoral por barbara kanigoski",
  description:
    "cerâmica autoral feita a mão. cada peça e única — como quem a recebe.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "cacali - cerâmica autoral",
    description:
      "cerâmica autoral feita a mão. cada peça e única — como quem a recebe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <SmoothScroll />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
