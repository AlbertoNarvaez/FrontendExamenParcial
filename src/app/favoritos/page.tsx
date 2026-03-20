'use client';
import { useFavoritos } from "@/context/favoritosContext";
import { useRouter } from "next/navigation";
import "./page.css";
import { useEffect, useState } from "react";
import { Cocktail } from "@/types";
import { getCocktailById } from "@/lib/api/getCocktailById";
import CocktailCard from "@/components/cocktail/page";

const FavoritosPage = () => {
  const { favoritos } = useFavoritos();
  const router = useRouter();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [miError, setError] = useState<string>("");

  useEffect(() => {
    if (favoritos.length === 0) {
      setCocktails([]);
      return;
    }
    setLoading(true);
    Promise.all(favoritos.map((id) => getCocktailById(id)))
      .then((responses) => {
        const data = responses.map((res) => res.data.drinks[0]);
        setCocktails(data);
        setError("");
      })
      .catch((e) => {
        setError(`Error cargando favoritos: ${e.message ? e.message : e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [favoritos]);

  return (
    <div className="favoritosContainer">
      <h1 className="tituloFavoritos">Mis Favoritos</h1>

      <div className="botones">
        <button onClick={() => router.push("/")}>Volver al inicio</button>
      </div>

      {loading && <h2>Loading...</h2>}
      {miError && <h2>{miError}</h2>}

      {!loading && favoritos.length === 0 ? (
        <p className="noFavoritos">No tienes favoritos todavia</p>
      ) : (
        <div className="listaFavoritos">
          {cocktails.map((c) => (
            <CocktailCard key={c.idDrink} cocktail={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritosPage;