import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Pokemondetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  if (!pokemon) {
    return <div>Loading...</div>; // Display loading state
  }

  useEffect(() => {
    downloadPokemon();
  }, [id]);

  return (
    <>
      <div className="pokemon-details-wrapper">
        <div className="pokemon-name">Name:{pokemon.name}</div>

        <img src={pokemon.image} alt="" className="pokemon-image" />
        <div>Height:{pokemon.height}</div>
        <div>Weight: {pokemon.weight}</div>
        <div className="pokemon-details-types">
          {pokemon.types &&
          pokemon.types.map((t) => (
            <div key={t}>{t}</div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pokemondetails;
