import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPokemonById } from '../../pokeApi/pokeAxios.js';
import Navbar from '../navbar/navbar'
import Carta from '../card/card';
import "../../styles/detail.css"

const Details = () => {
    const { id } = useParams(); // COGE EL "parametro dinamico" :id DESDE --> App.jsx
    const [pokemon, setPokemon] = useState(null);

    // --- CONSULTA A LA API EN pokeAxios.js ---
     useEffect(() => {
        getPokemonById(id)  
            .then(response => setPokemon(response.data))
            .catch(error => console.log(error));
    }, [id]);

    if (!pokemon) return <p>Cargando...</p>;  


    return (
        <div>
            <div className="menuTop">
                <Navbar 
                    type="navbar botones"
                    text="Detalles"
                />

                <div className="card">
                    <Carta 
                        type="detail" 
                        text={`${pokemon.id} - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}   // id + Nombre
                        img={pokemon.sprites.front_default}
                    />
                </div>
                <div className="pokemon-info">
                    <p><strong>HP:</strong> {pokemon.stats[0].base_stat}</p>
                    <p><strong>Ataque:</strong> {pokemon.stats[1].base_stat}</p>
                    <p><strong>Defensa:</strong> {pokemon.stats[2].base_stat}</p>
                    <p><strong>Tipo:</strong> {
                        pokemon.types
                        .map(type => type.type.name.toUpperCase())  // .map PORQUE PUEDE HABER MAS DE 1 UN TIPO
                        .join(", ")
                    }
                    </p>
                    <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                    <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                </div>
            </div>
        </div>
    )
}
export default Details;