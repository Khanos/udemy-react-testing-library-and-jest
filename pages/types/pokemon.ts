// Path: types/pokemon.ts

export interface types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
