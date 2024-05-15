import "./Pokemon.css";

function Pokemon({ name, image }) {
  return (
    <div className="pokemon">
      <div className="pokemon-name">
        <p>{name}</p>
        <div>
          <img src={image} alt="" className="pokemon-img" />
        </div>
      </div>
    </div>
  );
}
export default Pokemon;
