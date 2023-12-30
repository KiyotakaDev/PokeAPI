import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="absolute flex justify-evenly items-center w-full py-5 px-8 transform transition duration-500">
      <img className="h-auto w-[25%]" src="/pokeapi-logo.png" />
      <Link
        to="search"
        children={
          <p className="hover:text-yellow-300 transition-colors duration-200 animate-less_bounce">
            PokeSearch
          </p>
        }
      />
    </div>
  );
};

export default NavBar;
