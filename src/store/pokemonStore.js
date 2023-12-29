import { create } from "zustand";

const usePokemonStore = create((set, get) => ({
  baseURL: "https://pokeapi.co/api/v2/",
  pokemons: [],
  pokemonByID: [],
  offset: 0,
  incOffset: () => set((state) => ({ offset: state.offset + 30 })),
  fetchFirstPokemons: async () => {
    const { baseURL, offset, pokemons: currentPokemons } = get();
    try {
      const response = await fetch(
        `${baseURL}pokemon?limit=30&offset=${offset}`
      );
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          if (!detailsResponse.ok)
            throw new Error(
              `Error fetching pokemon details: ${detailsResponse.statusText}`
            );
          const detailsData = await detailsResponse.json();
          return {
            id: detailsData.id,
            name: detailsData.name,
            sprite: detailsData.sprites.other["official-artwork"].front_default,
          };
        })
      );

      // Filter pokemonDetails to avoid duplicates
      const filteredPokemonDetails = pokemonDetails.filter(
        (newPokemon) =>
          !currentPokemons.some(
            (existingPokemon) => existingPokemon.id === newPokemon.id
          )
      );

      set({ pokemons: [...currentPokemons, ...filteredPokemonDetails] });
    } catch (error) {
      console.error("Fetching pokemons error: ", error);
    }
  },
  fetchPokemonByID: async (id) => {
    const { baseURL } = get();
    try {
      const response = await fetch(`${baseURL}pokemon/${id}`);
      const data = await response.json();
  
      const tansformStatName = (name) => {
        if (name.startsWith("special-")) {
          const afterSpecial = name.substring("special-".length);
          const capitalizeAfterSpecial =
            afterSpecial.charAt(0).toUpperCase() + afterSpecial.slice(1);
          return `sp-${capitalizeAfterSpecial}`;
        }
        return name;
      };
  
      const modifiedStats = data.stats.map((stat) => ({
        name: tansformStatName(stat.stat.name),
        base: stat.base_stat,
      }));
  
      const pokemonData = {
        id: data.id,
        name: data.name,
        sprite:
          data.sprites.versions["generation-v"]["black-white"].animated.front_default,
        stats: modifiedStats,
        types: data.types.map((type) => type.type),
      };
  
      set({ pokemonByID: pokemonData });
    } catch (error) {
      console.error("Error fetching pokemon by id: ", error)
    }
  },
}));

export default usePokemonStore;
