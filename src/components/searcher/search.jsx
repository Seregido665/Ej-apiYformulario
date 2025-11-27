import React, { useState } from 'react';
import '../../styles/filters.css';
import { getPokemonByName } from '../../pokeApi/pokeAxios.js';

const Buscar = ({ type, onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const nombre = search.trim().toLowerCase();   // PASA LA BUSQUEDA A MINUSCULA

    // --- CONSULTA A LA API EN pokeAxios.js ---
    getPokemonByName(nombre) 
      .then((response) => {   // SI ENCUENTRA por NOMBRE ENTRA AQUI:
        onSearch(response.data.name);     // LO COJE DESDE allFilter.jsx HACIA EL axios
        setSearch(''); 
      })
      .catch((error) => {     // SI NO ENCUENTRA NADA:
        setSearch('');   
        if (error.response) alert('Pokémon no encontrado');
      });
  };

  
  return (
    <form className="buscador" onSubmit={handleSearch}>
      <input
        type={type}
        className="input"
        placeholder="Pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}  // CAPTURA CADA CAMBIO DEL input
      />
      <button type="submit" className="buscador-btn">
        Buscar
      </button>
    </form>
  )
}
export default Buscar;