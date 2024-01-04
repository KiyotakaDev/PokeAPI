import React, { useEffect, useRef, useMemo } from "react";
import usePokemonStore from "../store/pokemonStore";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { newtonsCradle } from "ldrs";
import PokeCard from "./PokeCard";

const styles = {
  container:
    "absolute bottom-0 xl:left-1/2 h-1/2 w-full xl:h-screen xl:w-1/2 overflow-y-scroll overflow-x-hidden p-4 xl:px-12 xl:py-6 flex flex-col gap-y-4 sm:gap-y-7 lg:gap-y-10 1k:gap-y-9 4k:gap-y-20",
  pokeText:
    "text-white text-shadow text-xs s:text-base ls:text-xl sm:text-2xl lg:text-4xl xl:text-2xl 1k:text-4xl 2k:text-5xl 4k:text-7xl",
};

const Loader = () => {
  newtonsCradle.register();

  return (
    <div className="absolute h-full w-full flex justify-center items-center">
      <div className="flex flex-col gap-y-10 justify-center items-center">
        <p className="animate-bounce text-2xl xl:text-4xl 1k:text-5xl 2k:text-7xl 4k:text-9xl px-10 text-center">
          Catching Pokemons{" "}
        </p>
        <l-newtons-cradle
          size="120"
          speed="1.4"
          color="white"
        ></l-newtons-cradle>
      </div>
    </div>
  );
};

const notFound = {
  attributes: { id: { value: "132" } },
  firstChild: {
    src: "/ditto.png",
    attributes: { alt: { value: "Ditto 404" } },
  },
};

const PokeList = () => {
  const {
    allPokemons,
    fetchAllPokemons,
    isLoading,
    filteredPokemonsArray,
    searchTerm,
    setSelectedCard,
    selectedCard,
  } = usePokemonStore();
  const containerRef = useRef();

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    containerRef.current.childNodes.forEach((child) => {
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, [allPokemons, filteredPokemonsArray, searchTerm]);

  useEffect(() => {
    if (filteredPokemonsArray.length <= 0 && searchTerm !== "") {
      setSelectedCard(notFound);
    }
  }, [filteredPokemonsArray, searchTerm]);

  const memonizedLink = useMemo(() => {
    if (selectedCard === null) {
      return (
        <div className="absolute h-3/4 flex justify-center items-center animate-less_bounce pointer-events-none text-center">
          <p className="text-base s:text-lg sm:text-2xl xl:text-3xl 1k:text-4xl 2k:text-6xl 4k:text-8xl px-10">
            Please select one pokemon!
          </p>
        </div>
      );
    } else {
      return (
        <Link
          className="flex justify-center items-center"
          to={`pokemon/${selectedCard.attributes.id.value}`}
        >
          <img
            className="object-cover w-1/2 ls:w-3/4 h-auto animate-less_bounce"
            src={selectedCard.firstChild.src}
            alt={selectedCard.firstChild.attributes.alt.value}
          />
        </Link>
      );
    }
  }, [selectedCard, allPokemons]);

  return (
    <div className={styles.pokeText}>
      {!isLoading && allPokemons && filteredPokemonsArray ? (
        <div className={`relative h-screen w-full flex flex-col xl:flex-row`}>
          <div className="absolute h-1/2 w-full xl:h-screen xl:w-1/2 ">
            <NavBar />
            <div className="w-full h-full flex justify-center items-end xl:items-center">
              {memonizedLink}
            </div>
          </div>
          <div
            ref={containerRef}
            className={`${styles.container} ${
              filteredPokemonsArray.length <= 0 && searchTerm !== ""
                ? "flex justify-center items-center animate-pulse"
                : ""
            }`}
          >
            {searchTerm === "" ? (
              allPokemons.map((pokemon) => (
                <PokeCard key={pokemon.id} pokemon={pokemon} />
              ))
            ) : filteredPokemonsArray.length > 0 ? (
              filteredPokemonsArray.map((pokemon) => (
                <PokeCard key={pokemon.id} pokemon={pokemon} />
              ))
            ) : (
              <div>Pokemon not found</div>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PokeList;
