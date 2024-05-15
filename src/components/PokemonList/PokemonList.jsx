import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import axios from "axios";
import "./PokemonList.css";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downloadPokemons() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemonResults = response.data.results;

    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await Promise.all(pokemonResultPromise);
    
    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id, // Ensure each object has a unique id
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    console.log(res)
    setPokemonList(res);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, []);

  return (
    <>
      <div className="pokemon-list-wrapper">
        <div>Pokemon List</div>
        {isLoading ? "Loading..." : 
        pokemonList.map((p) => (
          <Pokemon name={p.name} image={p.image} key={p.id} />
        ))}
      </div>
    </>
  );
}

export default PokemonList;
