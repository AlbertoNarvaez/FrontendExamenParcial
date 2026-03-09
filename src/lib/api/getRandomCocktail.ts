import { api } from "./api";

export const getRandomCocktail = async () => {
  const respuesta = await api.get(`/random.php`);
  return respuesta;
};
