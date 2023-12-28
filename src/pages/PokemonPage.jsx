import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import usePokemonStore from "../store/pokemonStore";
import "ldrs/bouncy";

const styles = {
  page: "bg-pokemon-purple-300 h-screen w-full text-white",
  text: "text-xs s:text-sm ls:text-base sm:text-2xl lg:text-4xl xl:text-2xl 1k:text-4xl 2k:text-5xl 4k:text-7xl",
  img: "object-contain w-16 s:w-24 ls:w-40 h-auto",
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
    pokemonByID &&
    pokemonByID.name &&
    pokemonByID.types &&
    pokemonByID.stats &&
    pokemonByID.sprite;

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
        <div className={`${styles.text} text-xs`}>
          <div className="bg-gradient-to-b from-pokemon-purple-100 to-pokemon-purple-200 flex flex-wrap justify-center gap-y-4 ls:gap-y-2 gap-x-8 items-center px-2 ls:px-3 py-5 ls:py-6">
            <h2>{upp(pokemonByID.name)}</h2>
            <div className="">
              {pokemonByID.types.map((type) => (
                <span
                  key={type.name}
                  className={`mx-2 px-3 py-1 rounded-md dark-text-shadow`}
                  style={{ backgroundColor: `var(--${type.name}-color)` }}
                >
                  {type.name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center py-10">
            <img
              className={`${styles.img}`}
              src={pokemonByID.sprite}
              alt={pokemonByID.name}
            />
          </div>
          {/* Stats */}
          <div className="bg-gradient-to-br from-pokemon-purple-100 to-pokemon-purple-200 to-60% w-11/12 mx-auto p-4 ls:p-6 rounded-lg flex flex-col gap-y-2 shadow-2xl">
            {pokemonByID.stats.map((stat) => (
              <div key={stat.name} className="w-full relative">
                <div className="w-1/2">{upp(stat.name)}</div>
                <div
                  className={`absolute w-1/2 left-1/2 top-0 border-2 h-full rounded-md bg-[#2a1233]`}
                  style={{ borderColor: `var(--${stat.name}-color)` }}
                >
                  <div className="w-full h-full p-[2.5px] s:p-1 ls:p-1.5 rounded-md flex items-center">
                    <span
                      className={`h-full rounded-md`}
                      style={{
                        width: `${(stat.base / 255) * 100}%`,
                        backgroundColor: `var(--${stat.name}-color)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link className="flex justify-center items-center pt-10" to="/">
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
