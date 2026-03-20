"use client"
import { useParams, useRouter } from "next/navigation";
import { Cocktail } from "@/types";
import { useState, useEffect } from "react";
import "./page.css";
import { getCocktailById } from "@/lib/api/getCocktailById";

const UnCocktail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [miError, setError] = useState<string>("");

  useEffect(() => {
    getCocktailById(String(id))
      .then((res) => {
        setCocktail(res.data.drinks[0]);
        setError("");
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message ? e.message : e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const getIngredientes = (c: Cocktail): string[] => {
    const keys = Array.from({ length: 15 }, (_, i) => `strIngredient${i + 1}` as keyof Cocktail);
    return keys
      .map((k) => c[k] as string | null)
      .filter((v): v is string => !!v && v.trim() !== "");
  };

  return (
    <div className="containerDetalle">
      {loading && <h1>Loading...</h1>}
      {miError && <h2>{miError}</h2>}

      {cocktail && (
        <>
          <h1>{cocktail.strDrink}</h1>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />

          <div className="infoCard">
            <p><span>Categoria: </span>{cocktail.strCategory}</p>
            <p><span>Alcoholico: </span>{cocktail.strAlcoholic}</p>
            <p><span>Tipo de vaso: </span>{cocktail.strGlass}</p>
            <p>
              <span>Ingredientes: </span>
              <span className="ingredientesList">
                {getIngredientes(cocktail).map((ing) => (
                  <span key={ing} className="ingredienteTag">{ing}</span>
                ))}
              </span>
            </p>
          </div>

          <div className="instrucciones">
            <h3>Instrucciones</h3>
            <p>{cocktail.strInstructions}</p>
          </div>
        </>
      )}

      <button className="botonVolver" onClick={() => router.push("/")}>
        Volver
      </button>
    </div>
  );
};

export default UnCocktail;