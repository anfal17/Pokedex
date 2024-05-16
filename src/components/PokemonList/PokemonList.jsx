import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import axios from "axios";
import "./PokemonList.css";

//import loading image
import loadingImg from "../../assets/images/loading.jpg";

function PokemonList() {
  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [pokedexurl, setPokedexurl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );

  // const [nextUrl, setNextUrl] = useState("");
  // const [prevUrl, setPrevUrl] = useState("");

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexurl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    // setIsLoading(true)
    setPokemonListState((state) => ({ ...state, isLoading: true }));

    const response = await axios.get(pokemonListState.pokedexurl); // This downloads a list of 20 pokemons

    const pokemonResults = response.data.results; // We get the array of pokemons from result

    // setNextUrl(response.data.next);
    // setPrevUrl(response.data.previous);
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    // Iterating over the array of pokemons, and using their URL, to create an array of promises
    // This will download those 20 pokemons
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const pokemonData = await Promise.all(pokemonResultPromise); // Array of 20 pokemon details

    // Iterating on the data of each pokemon to get its details
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id, // Ensure each object has a unique id
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });

    // console.log(pokeListResult);
    // setPokemonList(pokeListResult);
    // setIsLoading(false);

    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexurl]);

  return (
    <>
      <div className="pokemon-list-wrapper">
        <div className="pokemon-wrapper">
          {pokemonListState.isLoading ? (
            <img src={loadingImg} />
          ) : (
            pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))
          )}
        </div>
        <div className="controls">
          <button
            disabled={pokemonListState.prevUrl == null}
            onClick={() => {
              const urlToSet = pokemonListState.prevUrl;
              setPokemonListState({...pokemonListState ,prevUrl:urlToSet })
            }}
          >
            Prev
          </button>
          <button
            disabled={pokemonListState.nextUrl == null}
            onClick={() => {
              const urlToSet = pokemonListState.nextUrl;
              setPokemonListState({...pokemonListState ,nextUrl:urlToSet })
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
