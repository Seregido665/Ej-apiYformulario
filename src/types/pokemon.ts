// - Datos de results[] que devuelve getAllPokemons(). -
export interface PokemonListResult {
  name: string;
  url:  string;
}

// - Cuerpo completo de la lista. -
export interface PokemonListResponse {
  results: PokemonListResult[];
}

// - Tipos del Pokémon seleccionado -
export interface PokemonTypeEntry {
  type: {
    name: string;
  };
}

// - Estadísticas del Pokémon -
export interface PokemonStat {
  base_stat: number;
}

// - Sprites del Pokémon. -
export interface PokemonSprites {
  front_default: string | null;
}

// - Todo sobre el Pokémon -
export interface Pokemon {
  id:      number;
  name:    string;
  types:   PokemonTypeEntry[];
  stats:   PokemonStat[];
  sprites: PokemonSprites;    // -> Peso en hectogramos. Se divide entre 10 para mostrar kg.
  weight:  number;     // - Altura en decímetros. Entre 10 para metros.
  height:  number;
}
