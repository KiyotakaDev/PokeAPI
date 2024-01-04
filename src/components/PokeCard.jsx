import React, { useRef } from 'react'
import usePokemonStore from '../store/pokemonStore';

const cardStyles = {
  card: "relative bg-pokemon-purple-200 py-4 sm:py-7 lg:py-10 xl:py-8 2k:py-12 4k:py-16 rounded-br-full card cursor-pointer",
  image: "absolute h-16 w-16 ls:h-20 ls:w-20 sm:h-32 sm:w-32 lg:h-40 lg:w-40 xl:h-28 xl:w-28 1k:h-36 1k:w-36 2k:h-48 2k:w-48 4k:h-72 4k:w-72 -top-3 1k:-top-6 4k:-top-10 -left-3 xl:-left-8 4k:-left-12 object-contain",
  details: "relative w-[68%] lg:w-3/4 left-[22%] lg:left-[18%] flex justify-between items-center",
}

const PokeCard = ({ pokemon }) => {
  const { setSelectedCard, capitalizeFirstChar } = usePokemonStore();
  const cardRef = useRef(null);
  if (!cardRef) return;

  const handleClick = (ref) => {
    setSelectedCard(ref);
  };

  return (
    <div
      ref={cardRef}
      onClick={() => handleClick(cardRef.current)}
      id={pokemon.id}
      className={cardStyles.card}
    >
      {pokemon.sprite == null ? (
        <>
          <img
            className={cardStyles.image}
            src="/ditto.png"
            alt="ditto not found"
          />
          <p className="absolute bottom-0">404</p>
        </>
      ) : (
        <img
          className={cardStyles.image}
          src={pokemon.sprite}
          alt={pokemon.name}
          loading="lazy"
        />
      )}
      <div className={cardStyles.details}>
        <p className="text-start">#{pokemon.id}</p>
        <h3 className="text-end">{capitalizeFirstChar(pokemon.name)}</h3>
      </div>
    </div>
  );
};

export default PokeCard