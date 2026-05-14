import type { Metadata } from "next";
import "./globals.css";
import { PdwHeader } from "@/components/layout/PdwHeader";
import { PdwFooter } from "@/components/layout/PdwFooter";

export const metadata: Metadata = {
  title: "Portuguese Digital Wallet by TecMinho",
  description: "Site institucional da Portuguese Digital Wallet alinhado com eIDAS 2.0."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <PdwHeader />
        <main className="main">
          <div className="container">{children}</div>
        </main>
        <PdwFooter />
      </body>
    </html>
  );
}
