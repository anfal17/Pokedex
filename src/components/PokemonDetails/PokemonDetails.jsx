import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import loadingimg from "../../assets/images/loading.jpg"

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const data = response.data;

        setPokemon({
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
          weight: data.weight,
          height: data.height,
          types: data.types.map((type) => type.type.name),
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Failed to fetch Pokémon details.");
      }
    }

    fetchPokemon();
  }, [id]); // Make sure to include id as a dependency to re-fetch data when id changes

  if (isLoading) {
    return <div><div className="img">
      <img src={loadingimg} alt="" /></div><h1>Loading..</h1></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className="pokedex-redirect">
        <Link to="/">Pokedex</Link>
      </h1>
      <div className="pokemon-details-wrapper">
        <div className="pokemon-name">Name: {pokemon.name}</div>
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
        <div>Height: {pokemon.height}</div>
        <div>Weight: {pokemon.weight}</div>
        <div className="pokemon-details-types">
          {pokemon.types.map((type) => (
            <div key={type}>{type}</div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PokemonDetails;
