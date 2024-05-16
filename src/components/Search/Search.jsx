import "./Search.css";

function Search({updateSearchTerm}) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        id="pokemon-name-search"
        placeholder="pokemon name..."
        onChange={(e)=>updateSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Search;
