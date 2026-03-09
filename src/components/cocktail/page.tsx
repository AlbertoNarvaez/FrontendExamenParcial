import { Cocktail } from "@/types";
import "./page.css";
import { useRouter } from "next/navigation";

export const CocktailCard = (params: { cocktail: Cocktail }) => {
  const cocktail = params.cocktail;
  const router = useRouter();

  return (
    <div className="cardContainer">
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
      />
      <h2 className="nombreCocktail">{cocktail.strDrink}</h2>
      <button
        className="botonVer"
        onClick={() => router.push(`/cocktail/${cocktail.idDrink}`)}
      >
        Ver cocktail
      </button>
    </div>
  );
};
