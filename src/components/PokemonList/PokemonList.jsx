import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import axios from "axios";
import "./PokemonList.css";

//import loading image
import loadingImg from "../../assets/images/loading.jpg"

function PokemonList() {

  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokedexurl, setPokedexurl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemons() {

    setIsLoading(true)

    const response = await axios.get(pokedexurl); // This downloads a list of 20 pokemons

    const pokemonResults = response.data.results; // We get the array of pokemons from result

    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

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
    setPokemonList(pokeListResult);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokedexurl]);

  return (
    <>
      <div className="pokemon-list-wrapper">
        <div>Pokemon List</div>
        <div className="pokemon-wrapper">
          {isLoading
            ? <img src={loadingImg}/>
            : pokemonList.map((p) => (
                <Pokemon name={p.name} image={p.image} key={p.id} id= {p.id}/>
              ))}
        </div>
        <div className="controls">
          <button 
            disabled={prevUrl == null} 
            onClick={() => setPokedexurl(prevUrl)}
          >
            Prev
          </button>
          <button 
            disabled={nextUrl == null} 
            onClick={() => setPokedexurl(nextUrl)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
