import { create } from "zustand";

const usePokemonStore = create((set, get) => ({
  pokemons: [],
  offset: 0,
  incOffset: () => set((state) => ({ offset: state.offset + 30 })),
  fetchFirstPokemons: async () => {
    const { offset, pokemons: currentPokemons } = get();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`
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
}));

export default usePokemonStore;
