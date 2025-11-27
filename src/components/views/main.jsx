import { useNavigate } from "react-router-dom"
import { useEffect, useState, useMemo } from "react";
import { getAllPokemons } from '../../pokeApi/pokeAxios.js';
import Navbar from '../navbar/navbar'
import Carta from '../card/card'
import AllDropdowns from '../buttons/allFilters'
import "../../styles/main.css"
import '../../styles/filters.css'
import axios from "axios";

const MainMenu = () => {
    const navigate = useNavigate();
    const [allPokemons, setAllPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        generation: "all",
        type: "all",
        species: "all",
        weight: "all",
        height: "all",
    });


    // --- CONSULTA A LA API EN pokeAxios.js ---
    useEffect(() => {
        getAllPokemons()
          .then((response) => {
              const promises = response.data.results.map(pokemon => axios.get(pokemon.url));
                              // CON EL .map RECORRE TODOS LOS Pokemon, Y POR CADA UNO CREA UNA promesa.
                              // promises = ARRAY
              const details = Promise.all(promises)
                              // Promise.all GESTIONA LAS PROMESAS, Y SOLO FUNCIONA SI TODAS LAS PROMESAS SE CUMPLEN

              details.then((results) => {
                setAllPokemons(results.map(poke => poke.data))
                setLoading(false);
              })
          })
          .catch ((err) => {          // SI Promise.all NO SE CUMPLE ENTRARIA AQUI.
                console.error("Error cargando Pokémon:", err);
                setLoading(false);
          })
    }, []);
    

    // --- ACTUALIZA LA data CON CADA FILTRO APLICADO ---
    const handleFilterChange = (label, value) => {
      setFilters(prevFilters => ({ ...prevFilters, [label]: value }));
    };


    // --- LOGICA DE CADA FILTRO ---
    // useMemo() --> OPTIMIZA EL PROCESO SI TUVIESE QUE FILTRAR MILES DE DATOS.
    //    MEJOR TENERLO
    const filteredPokemons = useMemo(() => {
      if (filters.search) {                   // SI HAY BÚSQUEDA POR NOMBRE → ignoramos TODOS los demás filtros
        return allPokemons.filter(pokemon =>
          pokemon.name === filters.search
        );
      }

      return allPokemons.filter(pokemon => {  // SI NO HAY BUSQUEDA POR NOMBRE → aplicamos los filtros normales
        // --- POR GENERACION ---
        if (filters.generation !== "all") {
          const genRanges = {
              "gen1": [1, 151],
              "gen2": [152, 251],
              "gen3": [252, 386],
              "gen4": [387, 493], 
              "gen5": [494, 649],   
              "gen6": [650, 721],  
              "gen7": [722, 809]
          };
          const range = genRanges[filters.generation];
          const [min, max] = range;
          if (pokemon.id < min || pokemon.id > max) return false;
        }
        // --- TIPO ---
        if (filters.type !== "all") {
          const selectedType = filters.type;
          const pokemonTypes = pokemon.types.map(pokemon => pokemon.type.name);
          if (!pokemonTypes.includes(selectedType)) return false;
        }
        // --- PESO ---
        if (filters.weight !== "all") {
          const weightKg = pokemon.weight / 10; // PokeAPI DA PESO EN hectogramos, /10 LO PASAMOS A kilogramos
          const weightRanges = {
            "weight1": [0, 5],
            "weight2": [5, 20],
            "weight3": [20, 50],
            "weight4": [50, 100],
            "weight5": [100, 200],
            "weight6": [200, 400],
            "weight7": [400, 600],
            "weight8": [600, Infinity]
          };
          const [min, max] = weightRanges[filters.weight];
          if (weightKg < min || weightKg >= max) return false;
        }
        // --- ALTURA ---
        if (filters.height !== "all") {
          const heightM = pokemon.height / 10; // PokeAPI DA LA ALTURA EN decimetros. /10 LO PASAMOS A metros.
          const heightRanges = {
            "height1": [0, 0.5],
            "height2": [0.5, 1],
            "height3": [1, 2],
            "height4": [2, 5],
            "height5": [5, 8],
            "height6": [8, 12],
            "height7": [12, Infinity]
          };
          const [min, max] = heightRanges[filters.height];
          if (heightM < min || heightM >= max) return false;
        }
        return true;
      });
    }, [allPokemons, filters]);


  if (loading) return <div>Cargando Pokémon...</div>;  // PARA HACER LA APP MAS VISUAL.
                                                       // Y ASEGURA QUE TODO VA BIEN.


    return (
        <div>
          <div className="menuTop">
            <Navbar 
              type="navbar botones"
              text="Uso de API y Formulario."
            />
            <AllDropdowns onFilterChange={handleFilterChange}/>   {/* VIENE DE allFilter.jsx, Y APLICA CADA FILTRO AL MOMENTO*/}

            <div className="grid">
                {filteredPokemons.map((pokemon) => (
                    <div className="cards" key={pokemon.id}>
                        <Carta 
                            action={() => navigate(`/detail/${pokemon.id}`)}
                            text={`${pokemon.id}-${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`} // id + Nombre
                            img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                        />
                    </div>
                ))}
            </div>
            {filteredPokemons.length === 0 && <p>No se encontró ningún Pokémon.</p>}
          </div>
        </div>
    )
}

export default MainMenu;