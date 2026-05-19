import { useState } from 'react';
import '../../styles/filters.css';
import { getPokemonByName } from '../../pokeApi/pokeAxios';

interface BuscarProps {
  type: string;
  onSearch: (name: string) => void;
}

const Buscar = ({ type, onSearch }: BuscarProps) => {
  // Se resetea tras cada búsqueda.
  const [search, setSearch] = useState<string>('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const nombre = search.trim().toLowerCase();   // PASA LA BUSQUEDA A MINUSCULA

    // --- CONSULTA A LA API EN pokeAxios.ts ---
    getPokemonByName(nombre)
      .then((response) => {   
        onSearch(response.data.name);    
        setSearch('');
      })
      .catch((error) => {     
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
        onChange={(e) => setSearch(e.target.value)}  
      />
      <button type="submit" className="buscador-btn">
        Buscar
      </button>
    </form>
  )
}
export default Buscar;
