import type { Metadata } from "next";
import "./globals.css";
import { FavoritosProvider } from "@/context/favoritosContext";

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
      <body>
        <FavoritosProvider>
          {children}
        </FavoritosProvider>
      </body>
    </html>
  );
}