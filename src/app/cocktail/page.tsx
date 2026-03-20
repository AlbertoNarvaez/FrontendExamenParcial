'use client';
import { Cocktail } from "@/types";
import "./page.css";
import { useRouter } from "next/navigation";
import { useFavoritos } from "@/context/favoritosContext";

const CocktailCard = (params: { cocktail: Cocktail }) => {
  const cocktail = params.cocktail;
  const router = useRouter();
  const { favoritos, addFavorito, deleteFavorito } = useFavoritos();

  if (!cocktail) return null;

  const esFavorito = favoritos.includes(cocktail.idDrink);

  return (
    <div className="cardContainer">
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h2 className="nombreCocktail">{cocktail.strDrink}</h2>
      <button
        className="botonVer"
        onClick={() => router.push(`/cocktail/${cocktail.idDrink}`)}
      >
        Ver cocktail
      </button>
      <button
        className={esFavorito ? "botonFavoritoActivo" : "botonFavorito"}
        onClick={() =>
          esFavorito ? deleteFavorito(cocktail.idDrink) : addFavorito(cocktail.idDrink)
        }
      >
        {esFavorito ? "Quitar" : "Favorito"}
      </button>
    </div>
  );
};

export default CocktailCard;