import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import usePokemonStore from "../store/pokemonStore";
import "ldrs/bouncy";

const styles = {
  page: "bg-pokemon-purple-300 h-screen w-full text-white",
  text: "text-sm s:text-base ls:text-xl sm:text-2xl lg:text-4xl xl:text-2xl 1k:text-4xl 2k:text-5xl 4k:text-7xl",
  img: "w-1/2",
};

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <l-bouncy size="100" speed="1.75" color="white" />
    </div>
  );
};

const PokemonPage = () => {
  const { pokemonByID, fetchPokemonByID } = usePokemonStore();
  const { id } = useParams();
  const isValid =
    pokemonByID && pokemonByID.name && pokemonByID.types && pokemonByID.sprite;

  const upp = (word) => {
    return word[0].toUpperCase() + word.substring(1);
  };

  useEffect(() => {
    fetchPokemonByID(id);
  }, []);

  useEffect(() => {
    return () => fetchPokemonByID(id);
  }, [fetchPokemonByID, id]);

  return (
    <div className={styles.page}>
      {isValid ? (
        <div className={`${styles.text}`}>
          <div className="bg-gradient-to-b from-pokemon-purple-100 to-pokemon-purple-200 flex flex-col justify-center gap-y-2 items-center px-2 s:px-4 py-4 border-b-2 border-pokemon-purple-200">
            <h2>{upp(pokemonByID.name)}</h2>
            <div className="">
              {pokemonByID.types.map((type) => (
                <span
                  key={type.name}
                  className={`${type.name} mx-1 px-3 py-1 rounded-md dard-text-shadow`}
                >
                  {type.name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <div>
            <img
              className={`${styles.img}`}
              src={pokemonByID.sprite}
              alt={pokemonByID.name}
            />
          </div>
          <Link className="absolute bottom-10" to="/">
            Back to home page
          </Link>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PokemonPage;
