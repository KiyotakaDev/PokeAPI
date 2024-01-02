import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import usePokemonStore from "../store/pokemonStore";
import "ldrs/bouncy";

const styles = {
  page: "bg-pokemon-purple-300 h-screen w-full text-white text-xs s:text-sm ls:text-base sm:text-2xl lg:text-4xl xl:text-2xl 1k:text-4xl 2k:text-5xl 4k:text-7xl",
  name: "text-lg ls:text-xl sm:text-3xl lg:text-4xl 2k:text-6xl 4k:text-7xl",
  types:
    "bg-gradient-to-b from-pokemon-purple-100 to-pokemon-purple-200 flex flex-wrap justify-center xl:justify-evenly gap-y-4 ls:gap-y-2 gap-x-8 items-center px-2 ls:px-3 py-5 ls:py-6 xl:py-10 2k:py-16 4k:py-24",
  typeCard:
    "mx-2 2k:mx-8 px-3 xl:px-5 py-1 xl:py-3 rounded-md dark-text-shadow",
  imgContainer: "flex justify-center items-center py-10",
  img: "object-contain w-16 s:w-24 ls:w-40 h-auto xl:w-60",
  statContainer:
    "bg-gradient-to-br from-pokemon-purple-100 to-pokemon-purple-200 to-60% w-11/12 mx-auto p-4 ls:p-6 1k:p-8 2k:p-14 4k:p-24 rounded-lg flex flex-col gap-y-2 xl:gap-y-8 shadow-2xl",
  rightStat:
    "absolute w-1/2 left-1/2 top-0 border-2 h-full rounded-md bg-[#2a1233]",
};

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <l-bouncy size="100" speed="1.75" color="white" />
    </div>
  );
};

const PokemonPage = () => {
  const { pokemonByID, fetchPokemonByID, capitalizeFirstChar, isLoading } = usePokemonStore();
  const { id } = useParams();

  useEffect(() => {
    fetchPokemonByID(id);
  }, [fetchPokemonByID, id]);

  return (
    // Page
    <div className={styles.page}>
      {!isLoading ? (
        // General container
        <>
          <div className={styles.types}>
            <h2 className={styles.name}>{capitalizeFirstChar(pokemonByID.name)}</h2>
            <div>
              {pokemonByID.types.map((type) => (
                <span
                  key={type.name}
                  className={styles.typeCard}
                  style={{ background: `var(--${type.name}-color)` }}
                >
                  {type.name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <div className="xl:flex xl:container xl:px-20 4k:px-40 xl:mx-auto xl:h-3/4 flex-row-reverse justify-center items-center">
            <div className={`${styles.imgContainer} xl:w-1/2`}>
              <img
                className={`${styles.img}`}
                src={pokemonByID.sprite}
                alt={pokemonByID.name}
              />
            </div>
            {/* Stats container */}
            <div className={`${styles.statContainer} xl:m-0 xl:w-1/2`}>
              {pokemonByID.stats.map((stat) => (
                <div key={stat.name} className="w-full relative">
                  {/* Left container */}
                  <div className="w-1/2">{capitalizeFirstChar(stat.name)}</div>
                  {/* Right container */}
                  <div
                    className={styles.rightStat}
                    style={{ borderColor: `var(--${stat.name}-color)` }}
                  >
                    {/* Stat progress bar container */}
                    <div className="w-full h-full p-[2.5px] s:p-1 ls:p-1.5 xl:p-2 rounded-md flex items-center">
                      {/* Bar */}
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
          </div>
          <Link
            className="flex justify-center items-center pt-10 xl:pt-0"
            to="/"
          >
            Back to home page
          </Link>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PokemonPage;
