"use client"
import { useEffect, useState } from "react";
import "./globals.css";
import "./page.css";
import { Cocktail } from "@/types";
import CocktailCard from "@/components/cocktail/page";
import { searchCocktails } from "@/lib/api/searchCocktails";
import { getRandomCocktail } from "@/lib/api/getRandomCocktail";
import { useRouter } from "next/navigation";
import { useFavoritos } from "@/context/favoritosContext";

const Home = () => {
  const router = useRouter();
  const { favoritos } = useFavoritos();
  const [inputName, setInputName] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [miError, setError] = useState<string>("");

  const borrarFiltros = () => {
    setInputName("");
    setSearch("");
    setCocktails([]);
  };

  const handleAleatorio = () => {
    getRandomCocktail()
      .then((res) => {
        const cocktail: Cocktail = res.data.drinks[0];
        router.push(`/cocktail/${cocktail.idDrink}`);
      })
      .catch((e) => {
        setError(`Error: ${e.message ? e.message : e}`);
      });
  };

  useEffect(() => {
    if (!search.trim()) {
      setCocktails([]);
      return;
    }
    setLoading(true);
    searchCocktails(search)
      .then((res) => {
        setCocktails(res.data.drinks ?? []);
        setError("");
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message ? e.message : e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  return (
    <div className="mainContainer">
      <h1 className="tituloPrincipal">Cocktail Explorer</h1>
      <p className="subtitulo">Intenta no bebertelos todos jejejeje</p>

      <form
        className="buscador"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(inputName);
        }}
      >
        <label>Nombre: </label>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        {inputName && (
          <button type="button" className="botonBorrar" onClick={borrarFiltros}>
            Borrar Filtros
          </button>
        )}
      </form>

      <div className="botones">
        <button onClick={() => setSearch(inputName)}>Buscar</button>
        <button className="botonAleatorio" onClick={handleAleatorio}>
          Dime algo bonito
        </button>
        <button onClick={() => router.push("/favoritos")}>
          Favoritos ({favoritos.length})
        </button>
      </div>

      {loading && <h2>Loading...</h2>}
      {miError && <h2>{miError}</h2>}

      {!loading && cocktails.length > 0 && (
        <p className="totalResultados">{cocktails.length} cocktails encontrados</p>
      )}

      <div className="cocktailsContainer">
        {cocktails.length > 0 ? (
          cocktails.map((c) => (
            <CocktailCard key={c.idDrink} cocktail={c} />
          ))
        ) : (
          !loading && search && <p className="noResultados">No se han encontrado cocktails</p>
        )}
      </div>
    </div>
  );
};

export default Home;