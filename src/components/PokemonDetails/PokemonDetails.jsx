import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import loadingimg from "../../assets/images/loading.jpg";
import "./PokemonDetails.css";

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
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <div className="img">
          <img src={loadingimg} alt="" />
        </div>
        <h1>Loading..</h1>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="pokemon-details-wrapper">
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
        <div className="pokemon-name">
          Name: <span>{pokemon.name}</span>
        </div>
        <div>
          Height: <span>{pokemon.height}</span>
        </div>
        <div>
          Weight: <span>{pokemon.weight}</span>
        </div>
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
