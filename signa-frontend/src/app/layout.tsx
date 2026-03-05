import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIGNA — Astrologia por signos",
  description: "Plataforma de astrologia com foco em signos, compatibilidade e horóscopo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
