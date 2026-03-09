import { api } from "./api";

export const searchCocktails = async (nombre: string) => {
  const respuesta = await api.get(`/search.php?s=${nombre}`);
  return respuesta;
};
