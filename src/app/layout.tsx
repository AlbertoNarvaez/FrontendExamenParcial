import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cocktail Explorer",
  description: "Parcial - Programacion de Interfaces Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

