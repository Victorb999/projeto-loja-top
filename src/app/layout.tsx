import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Projeto Loja",
  description: "Loja top",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="text-gray-200 bg-zinc-950">{children}</body>
    </html>
  );
}
