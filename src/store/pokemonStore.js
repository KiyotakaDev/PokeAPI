import { create } from "zustand";

const usePokemonStore = create((set, get) => ({
  baseURL: "https://pokeapi.co/api/v2/",
  pokemonByID: [],
  allPokemons: [],
  filteredPokemonsArray: [],
  isLoading: true,
  dataLoaded: false,
  selectedCard: null,
  setSelectedCard: (current) => set({ selectedCard: current }),
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  fetchPokemonByID: async (id) => {
    const { baseURL } = get();
    try {
      set({ isLoading: true });
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
        sprite: data.sprites.other["official-artwork"].front_default,
        stats: modifiedStats,
        types: data.types.map((type) => type.type),
      };

      set({ pokemonByID: pokemonData, isLoading: false });
    } catch (error) {
      console.error("Error fetching pokemon by id: ", error);
    }
  },
  fetchAllPokemons: async () => {
    const { baseURL, dataLoaded } = get();
    if (dataLoaded) return;

    try {
      set({ isLoading: true })
      // Tries getting data from cache
      const cache = await caches.open("pokemon-cache");
      const cachedResponse = await cache.match(`${baseURL}pokemon?limit=1020`);

      if (cachedResponse) {
        const data = await cachedResponse.json();

        set({ allPokemons: data, dataLoaded: true, isLoading: false });
      } else {
        // If !data in cache, fetch
        const response = await fetch(`${baseURL}pokemon?limit=1020`);
        const data = await response.json();

        const base = await Promise.all(
          data.results.map(async (pokemon) => {
            const baseDataResponse = await fetch(pokemon.url);
            const baseData = await baseDataResponse.json();

            return {
              id: baseData.id,
              name: baseData.name,
              sprite: baseData.sprites.other["official-artwork"].front_default,
            };
          })
        );

        // Save data in cache
        await cache.put(
          `${baseURL}pokemon?limit=1020`,
          new Response(JSON.stringify(base))
        );

        set({ allPokemons: base, dataLoaded: true, isLoading: false });
      }
    } catch (error) {
      console.error("Fetching all pokemon error: ", error);
      set({ isLoading: false });
    }
  },
  filterPokemons: () => {
    const { allPokemons, searchTerm } = get();
    try {
      if (searchTerm !== "") {
        const filteredPokemons = allPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        set({ filteredPokemonsArray: filteredPokemons });
      } else {
        set({ filteredPokemonsArray: allPokemons });
      }
    } catch (error) {
      console.error("Search error: ", error);
    }
  },
  capitalizeFirstChar: (word) => {
    if (!word) return
    return word[0].toUpperCase() + word.substring(1);
  },
}));

export default usePokemonStore;
