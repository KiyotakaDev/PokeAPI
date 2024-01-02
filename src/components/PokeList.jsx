import React, { useEffect, useRef, useState, useMemo } from "react";
import usePokemonStore from "../store/pokemonStore";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { newtonsCradle } from "ldrs";

const styles = {
  container:
    "absolute bottom-0 xl:left-1/2 h-1/2 w-full xl:h-screen xl:w-1/2 overflow-y-scroll overflow-x-hidden p-4 xl:px-12 xl:py-6 flex flex-col gap-y-4 sm:gap-y-7 lg:gap-y-10 1k:gap-y-9 4k:gap-y-20",
  pokemonCard:
    "relative bg-pokemon-purple-200 py-4 sm:py-7 lg:py-10 xl:py-8 2k:py-12 4k:py-16 rounded-br-full",
  pokeText:
    "text-white text-shadow text-xs s:text-base ls:text-xl sm:text-2xl lg:text-4xl xl:text-2xl 1k:text-4xl 2k:text-5xl 4k:text-7xl",
  pokemonImage:
    "absolute h-16 w-16 ls:h-20 ls:w-20 sm:h-32 sm:w-32 lg:h-40 lg:w-40 xl:h-28 xl:w-28 1k:h-36 1k:w-36 2k:h-48 2k:w-48 4k:h-72 4k:w-72 -top-3 1k:-top-6 4k:-top-10 -left-3 xl:-left-8 4k:-left-12 object-contain",
  pokemonDetails:
    "w-3/4 relative left-[22%] lg:left-[18%] flex justify-between pr-5 sm:pr-12 4k:pr-24 gap-x-20",
};

const Loader = () => {
  newtonsCradle.register();

  return (
    <div className="absolute h-full w-full flex justify-center items-center">
      <div className="flex flex-col gap-y-10 justify-center items-center">
        <p className="animate-bounce text-2xl xl:text-4xl 1k:text-5xl 2k:text-7xl 4k:text-9xl px-10 text-center">Catching Pokemons </p>
        <l-newtons-cradle
          
          size="120"
          speed="1.4"
          color="white"
        ></l-newtons-cradle>
      </div>
    </div>
  );
};

const PokeCard = ({ pokemon }) => {
  const { setSelectedCard, capitalizeFirstChar } = usePokemonStore();
  const cardRef = useRef(null);
  if (!cardRef) return;

  const handleClick = (ref) => {
    setSelectedCard(ref)
  }

  return (
    <div
      ref={cardRef}
      onClick={() => handleClick(cardRef.current)}
      id={pokemon.id}
      className={`card cursor-pointer ${styles.pokemonCard} hover:scale-[1.02] xl:hover:scale-105 hover:bg-pokemon-purple-50 active:scale-95`}
    >
      {pokemon.sprite == null ? (
        <>
          <img
            className={styles.pokemonImage}
            src="/ditto.png"
            alt="ditto not found"
          />
          <p className="absolute bottom-0">404</p>
        </>
      ) : (
        <img
          className={styles.pokemonImage}
          src={pokemon.sprite}
          alt={pokemon.name}
          loading="lazy"
        />
      )}
      <div className={styles.pokemonDetails}>
        <p>#{pokemon.id}</p>
        <h3>{capitalizeFirstChar(pokemon.name)}</h3>
      </div>
    </div>
  );
};

const PokeList = () => {
  const {
    allPokemons,
    fetchAllPokemons,
    isLoading,
    filteredPokemonsArray,
    searchTerm,
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
      { threshold: 0 }
    );

    containerRef.current.childNodes.forEach((child) => {
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, [allPokemons, filteredPokemonsArray]);

  const memonizedLink = useMemo(() => {
    if (selectedCard) {
      return (
        <Link
          className="flex justify-center items-center"
          to={`pokemon/${selectedCard.attributes.id.value}`}
        >
          <img
            className="object-cover w-[75%] h-auto animate-less_bounce"
            src={selectedCard.firstChild.src}
            alt={selectedCard.firstChild.attributes.alt.value}
          />
        </Link>
      );
    } else {
      return (
        <div className={`${styles.largePokeText} absolute h-3/4 flex justify-center items-center animate-less_bounce pointer-events-none text-center`}>
          <p className="text-base s:text-lg sm:text-2xl xl:text-3xl 1k:text-4xl 2k:text-6xl 4k:text-8xl px-10">Please select one pokemon!</p>
        </div>
      )
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
          <div ref={containerRef} className={styles.container}>
            {searchTerm === ""
              ? allPokemons.map((pokemon) => (
                  <PokeCard key={pokemon.id} pokemon={pokemon} />
                ))
              : filteredPokemonsArray.map((pokemon) => (
                  <PokeCard key={pokemon.id} pokemon={pokemon} />
                ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PokeList;
