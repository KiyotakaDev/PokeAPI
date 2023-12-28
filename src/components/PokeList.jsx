import React, { useEffect, useRef, useState } from "react";
import usePokemonStore from "../store/pokemonStore";
import { Link } from "react-router-dom";

const styles = {
  container:
    "absolute bottom-0 xl:left-1/2 h-1/2 w-full xl:h-screen xl:w-1/2 overflow-y-scroll overflow-x-hidden p-4 xl:px-12 xl:py-6 flex flex-col gap-y-4 sm:gap-y-7 lg:gap-y-10 1k:gap-y-9 4k:gap-y-20",
  pokemonCard:
    "relative bg-pokemon-purple-200 py-4 sm:py-7 lg:py-10 xl:py-8 2k:py-12 4k:py-16 rounded-br-full text-white text-shadow text-sm s:text-base ls:text-xl sm:text-2xl lg:text-4xl xl:text-2xl 1k:text-4xl 2k:text-5xl 4k:text-7xl",
  pokemonImage:
    "absolute h-16 w-16 ls:h-20 ls:w-20 sm:h-32 sm:w-32 lg:h-40 lg:w-40 xl:h-28 xl:w-28 1k:h-36 1k:w-36 2k:h-48 2k:w-48 4k:h-72 4k:w-72 -top-3 1k:-top-6 4k:-top-10 -left-3 xl:-left-8 4k:-left-12 object-contain",
  pokemonDetails:
    "w-3/4 relative left-[22%] lg:left-[18%] flex justify-between pr-5 sm:pr-12 4k:pr-24",
};

const PokeCard = ({ pokemon }) => {
  return (
    <div id={pokemon.id} className={`card ${styles.pokemonCard}`}>
      <img
        className={styles.pokemonImage}
        src={pokemon.sprite}
        alt={pokemon.name}
        loading="lazy"
      />
      <div className={styles.pokemonDetails}>
        <p>#{pokemon.id}</p>
        <h3>{pokemon.name}</h3>
      </div>
      {/* {console.log(pokemon)} */}
    </div>
  );
};

const PokeList = () => {
  const { pokemons, fetchFirstPokemons, offset, incOffset } = usePokemonStore();
  const containerRef = useRef();
  const [firstVisiblePokemonId, setFirstVisiblePokemonId] = useState(null);

  useEffect(() => {
    fetchFirstPokemons();
  }, []);

  useEffect(() => {
    return () => fetchFirstPokemons();
  }, [offset, fetchFirstPokemons]);

  useEffect(() => {
    if (!containerRef.current) return;
    const lastCard = containerRef.current.lastElementChild;
    if (!lastCard) return;

    const firstCardObserver = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          setFirstVisiblePokemonId(entries.target);
        } else {
          firstCardObserver.observe(entries.target.nextElementSibling);
          setFirstVisiblePokemonId(entries.target);
        }
      },
      { threshold: 0.6 }
    );
    firstCardObserver.observe(containerRef.current.firstElementChild);

    const lastCardObserver = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          incOffset();
        }
      },
      { threshold: 0 }
    );
    if (lastCard) {
      lastCardObserver.observe(lastCard);
    }

    return () => {
      firstCardObserver.disconnect();
      lastCardObserver.disconnect();
    };
  }, [pokemons]);

  return (
    <>
      {firstVisiblePokemonId && (
        <Link to={`pokemon/${firstVisiblePokemonId.attributes.id.value}`}>
          <img
            className="mx-auto object-contain animate-less_bounce"
            src={firstVisiblePokemonId.firstChild.src}
            alt={firstVisiblePokemonId.firstChild.attributes.alt.value}
          />
        </Link>
      )}
      {/* {firstVisiblePokemonId && console.log(firstVisiblePokemonId.attributes.id)} */}
      <div ref={containerRef} className={styles.container}>
        {pokemons
          ? pokemons.map((pokemon) => (
              <PokeCard key={pokemon.id} pokemon={pokemon} />
            ))
          : null}
      </div>
    </>
  );
};

export default PokeList;
