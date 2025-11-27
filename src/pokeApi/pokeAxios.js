import axios from "axios";

// --- PARA main.jsx ---
export const getAllPokemons = () => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=809`)
};

// --- PARA detail.jsx ---
export const getPokemonById = (id) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
};

// --- PARA search.jsx ---
export const getPokemonByName = (name) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
};