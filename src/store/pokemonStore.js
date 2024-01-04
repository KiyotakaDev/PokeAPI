import { create } from "zustand";

// Global variable
const baseURL = "https://pokeapi.co/api/v2/"

const usePokemonStore = create((set, get) => ({
  // Initial states:
  pokemonByID: [],
  allPokemons: [],
  filteredPokemonsArray: [],
  isLoading: true,
  dataLoaded: false,
  selectedCard: null,
  searchTerm: "",

  // Functions
  // Set functions
  setSelectedCard: (current) => set({ selectedCard: current }),
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Fetch functions
  fetchPokemonByID: async (id) => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${baseURL}pokemon/${id}`);
      const data = await response.json();

      // Transform name
      const tansformStatName = (name) => {
        // If name startsWith "special-" -> 
        if (name.startsWith("special-")) {
          // Original: "special-defence" -> Modified: "defence" 
          const afterSpecial = name.substring("special-".length);
          // defense -> D -> D + efense -> Defense
          const capitalizeAfterSpecial =
            afterSpecial.charAt(0).toUpperCase() + afterSpecial.slice(1);
          // Return the string "sp-" + "Defense"
          return `sp-${capitalizeAfterSpecial}`;
        }
        // Return "sp-Defense"
        return name;
      };

      // Function to modify stats
      const modifiedStats = data.stats.map((stat) => ({
        name: tansformStatName(stat.stat.name),
        base: stat.base_stat,
      }));

      // Return pokemon data
      const pokemonData = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.other["official-artwork"].front_default,
        stats: modifiedStats,
        types: data.types.map((type) => type.type),
        height: (data.height / 10).toFixed(1), // 69kg -> 6.9kg
        weight: (data.weight / 10).toFixed(1), // 06m -> 0.6m
      };

      set({ pokemonByID: pokemonData, isLoading: false });
    } catch (error) {
      console.error("Error fetching pokemon by id: ", error);
    }
  },
  fetchAllPokemons: async () => {
    const { dataLoaded } = get();
    if (dataLoaded) return;

    try {
      set({ isLoading: true });
      // Tries getting data from cache
      const cache = await caches.open("pokemon-cache");
      const cachedResponse = await cache.match(`${baseURL}pokemon?limit=1020`);

      // If cache
      if (cachedResponse) {
        const data = await cachedResponse.json();

        // Set data from cache
        set({ allPokemons: data, dataLoaded: true, isLoading: false });
      } else {
        // If !data in cache, fetch data
        const response = await fetch(`${baseURL}pokemon?limit=1020`);
        const data = await response.json();

        const base = await Promise.all(
          data.results.map(async (pokemon) => {
            const baseDataResponse = await fetch(pokemon.url);
            const baseData = await baseDataResponse.json();

            // Return pokemon base data
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

        // Set data from fetch
        set({ allPokemons: base, dataLoaded: true, isLoading: false });
      }
    } catch (error) {
      console.error("Fetching all pokemon error: ", error);
      set({ isLoading: false });
    }
  },

  // Other functions
  filterPokemons: () => {
    const { allPokemons, searchTerm } = get();
    try {
      // If search term is not empty ->
      if (searchTerm !== "") {
        // Filter pokemon by name -> includes(searchTerm)?
        const filteredPokemons = allPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // If filtered pokemons -> give data to filteredPokemonArray
        set({ filteredPokemonsArray: filteredPokemons });
      } else {
        // If search term is empty filteredPokemonsArray = allPokemons
        set({ filteredPokemonsArray: allPokemons });
      }
    } catch (error) {
      console.error("Search error: ", error);
    }
  },
  capitalizeFirstChar: (word) => {
    if (!word) return;
    // bulbasur -> "B" + "ulbasur" -> "Bulbasur"
    return word[0].toUpperCase() + word.substring(1);
  },
}));

export default usePokemonStore;
