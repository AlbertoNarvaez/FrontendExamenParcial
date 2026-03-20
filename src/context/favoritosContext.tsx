'use client';

import { createContext, ReactNode, useContext, useState } from "react";

type FavoritosContextType = {
  favoritos: string[];
  addFavorito: (id: string) => void;
  deleteFavorito: (id: string) => void;
};

const FavoritosContext = createContext<FavoritosContextType | null>(null);

export const FavoritosProvider = ({ children }: { children: ReactNode }) => {
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const addFavorito = (id: string) => {
    setFavoritos([...favoritos, id]);
  };

  const deleteFavorito = (id: string) => {
    setFavoritos(favoritos.filter((x) => x !== id));
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, addFavorito, deleteFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error("Estas fuera del proveedor!");
  }
  return context;
};