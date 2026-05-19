import axios, { AxiosResponse } from "axios";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";

export const getAllPokemons = (): Promise<AxiosResponse<PokemonListResponse>> => {
  return axios.get<PokemonListResponse>("https://pokeapi.co/api/v2/pokemon?limit=809");
};

export const getPokemonById = (id: number | string): Promise<AxiosResponse<Pokemon>> => {
  return axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
};

export const getPokemonByName = (name: string): Promise<AxiosResponse<Pokemon>> => {
  return axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
};
