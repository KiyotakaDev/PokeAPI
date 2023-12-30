import React from "react";
import usePokemonStore from "../store/pokemonStore";

const NavBar = () => {
  const { fetchBasePokemonByID, filterPokemons, searchTerm, setSearchTerm } =
    usePokemonStore();

  const handleSearch = () => {
    const filteredPokemons = filterPokemons();
    console.log("Filtered pokemons: ", filteredPokemons);
  };

  return (
    <div className="absolute flex justify-evenly items-center w-full py-5 px-8 gap-x-10 transform transition duration-500">
      <div className="w-[30%]">
        <img className="h-auto w-full" src="/pokeapi-logo.png" />
      </div>

      <form
        className="w-[70%] flex justify-between items-center border-2 border-pokemon-purple-50 rounded-lg py-2 px-4 gap-x-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-xs ls:text-sm sm:text-2xl lg:text-4xl xl:text-2xl 1k:text-4xl 2k:text-5xl 4k:text-7xl"
        />
        <button
          className="hover:text-pokemon-purple-50 transition-colors duration-200"
          onClick={handleSearch}
          children={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          }
        />
      </form>
    </div>
  );
};

export default NavBar;
