import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import usePokemonStore from "../store/pokemonStore";
import "ldrs/bouncy";

const styles = {
  page: "bg-pokemon-purple-300 relative h-screen w-full text-white text-xs s:text-sm ls:text-base sm:text-2xl lg:text-4xl xl:text-2xl 1k:text-4xl 2k:text-5xl 4k:text-7xl",
  name: "text-lg ls:text-xl sm:text-3xl lg:text-4xl 2k:text-6xl 4k:text-7xl",
  typeCard:
    "mx-2 2k:mx-8 px-3 xl:px-5 py-1 xl:py-3 rounded-md dark-text-shadow",
  imgContainer: "flex justify-center items-center pt-10",
  img: "object-contain w-[50%] h-auto animate-less_bounce",
  statContainer:
    "bg-gradient-to-br from-pokemon-purple-100 to-pokemon-purple-200 to-60% border-b-2 border-white w-[98%] ls:w-11/12 mx-auto p-4 ls:p-6 1k:p-10 2k:p-14 4k:p-24 rounded-lg flex flex-col gap-y-2 xl:gap-y-8 shadow-2xl",
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
  const {
    pokemonByID,
    fetchPokemonByID,
    isLoading,
    capitalizeFirstChar,
    setSearchTerm,
    setSelectedCard,
  } = usePokemonStore();
  const { id } = useParams();
  const check =
    pokemonByID &&
    pokemonByID.name &&
    pokemonByID.types &&
    pokemonByID.sprite &&
    pokemonByID.stats &&
    pokemonByID.height &&
    pokemonByID.weight;

  useEffect(() => {
    fetchPokemonByID(id);
  }, [fetchPokemonByID, id]);

  return (
    // Page
    <div className={styles.page}>
      {!isLoading && check ? (
        // General container
        <>
          <div className="bg-gradient-to-b from-pokemon-purple-100 to-pokemon-purple-200 flex flex-wrap justify-between items-center pb-4 pt-2">
            <div className="w-[15%] ls:w-[12%] sm:w-[10%] xl:w-[5%] ml-3 2k:ml-20 4k:ml-42">
              <Link to="/">
                <img
                  className="h-auto w-full p-2 "
                  src="/house.svg"
                  alt="house-icon"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCard(null);
                  }}
                />
              </Link>
            </div>
            <div className="w-[80%] flex flex-wrap justify-center items-center">
              <h2 className={styles.name}>
                {capitalizeFirstChar(pokemonByID.name)}
              </h2>
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
          </div>
          <div className="absolute s:bottom-[15%] w-full flex flex-col gap-y-4 xl:flex-row xl:pt-3 xl:pr-12 1k:pt-32 1k:pr-32">
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
              <div className="mt-2 ls:mt-10 bg-gradient-to-b from-pokemon-purple-50 to-pokemon-purple-300 to-60% border-b-2 flex flex-col justify-center items-center w-[98%] mx-auto rounded-md gap-y-2 py-3">
                <p>Height: {pokemonByID.height}M</p>
                <span className="border border-dashed border-white w-[90%]" />
                <p>Weight: {pokemonByID.weight}KG</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PokemonPage;
