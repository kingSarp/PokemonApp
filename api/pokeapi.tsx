// export const api = {
//     getPokemon: async (name: string) => {
//         const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
//         const data = await res.json();
//         return data;
//     },
// }

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
  abilities: any;
  stats:any;
  sprites:any;
}

export const getPokemon = async (limit: number = 150): Promise<Pokemon[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const data = await response.json();
  return data.results.map((item: Pokemon, index: number) => ({
    ...item,
    id: index + 1,
    name: item.name,
    url: item.url,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      index + 1
    }.png`,
  }));
};
export const getPokemonDetail = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
};
