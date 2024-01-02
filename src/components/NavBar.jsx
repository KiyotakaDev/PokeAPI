import React from "react";
import usePokemonStore from "../store/pokemonStore";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { filterPokemons, searchTerm, setSearchTerm } = usePokemonStore();
  const navigate = useNavigate()

  return (
    <div className="absolute flex justify-evenly items-center w-full py-5 px-8 gap-x-10 transform transition duration-500">
      <div className="w-[40%]">
        <Link
          to="/"
          children={<img className="h-auto w-full transition-transform ease-out duration-200 hover:scale-105 active:scale-90" src="/pokeapi-logo.png" />}
        />
      </div>

      <div
        className="w-[60%] flex justify-between items-center border-2 border-pokemon-purple-50 rounded-lg py-2 px-4 gap-x-2"
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            filterPokemons()
          }}
          className="w-[95%] ls:w-[92%] xl:w-[90%] bg-transparent outline-none text-xs ls:text-sm sm:text-2xl lg:text-4xl xl:text-2xl 1k:text-4xl 2k:text-5xl 4k:text-7xl"
        />
        <button
          className="hover:text-pokemon-purple-50 transition-colors duration-200 w-[5%] ls:w-[8%] xl:w-[10%]"
          children={
            <img className="h-auto w-full" src="/search.svg" alt="search" />
          }
        />
      </div>
    </div>
  );
};

export default NavBar;
