import { api } from "./api";

export const getCocktailById = async (id: string) => {
  const respuesta = await api.get(`/lookup.php?i=${id}`);
  return respuesta;
};
