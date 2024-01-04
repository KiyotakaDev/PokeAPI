import React from "react";
import usePokemonStore from "../store/pokemonStore";

// NavBar component
const NavBar = () => {
  const { filterPokemons, searchTerm, setSearchTerm, setSelectedCard } =
    usePokemonStore();

  return (
    // Nav container
    <div className="absolute flex justify-evenly items-center w-full py-5 px-8 gap-x-10 transform transition duration-500">
      {/* Pokemon image container */}
      <div className="w-[40%]">
        {/* Image for home page routing */}
        <img
          className="h-auto w-full transition-transform ease-out duration-200 hover:scale-105 active:scale-90"
          src="/pokeapi-logo.png"
          onClick={() => {
            setSearchTerm("");
            setSelectedCard(null);
          }}
        />
      </div>

      {/* Search pokemon */}
      <div className="w-[60%] flex justify-between items-center border-2 border-pokemon-purple-50 rounded-lg py-2 px-4 gap-x-2">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          // Input value and filterPokemons func
          onChange={(e) => {
            setSearchTerm(e.target.value);
            filterPokemons();
          }}
          className="w-[91%] xl:w-[90%] bg-transparent outline-none text-xs ls:text-sm sm:text-2xl lg:text-4xl xl:text-2xl 1k:text-4xl 2k:text-5xl 4k:text-7xl"
        />
        {/* Button */}
        <button
          className="hover:text-pokemon-purple-50 transition-colors duration-200 w-[9%] xl:w-[10%]"
          children={
            <img className="h-auto w-full" src="/search.svg" alt="search" />
          }
        />
      </div>
    </div>
  );
};

export default NavBar;
