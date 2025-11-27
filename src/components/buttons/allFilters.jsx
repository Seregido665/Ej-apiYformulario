import Dropdown from './filter'
import '../../styles/filters.css'
import Buscar from '../searcher/search'

const AllDropdowns = ({ onFilterChange }) => {

    // --- FUNCIONES DE FILTRADO DE LOS Dropdown ---
    //     TODOS PASAN POR onFilterChange, Y MANDA EL RESULTADO A main.jsx
    const handleGeneration = (value) => onFilterChange('generation', value);
    const handleType = (value) => onFilterChange('type', value);
    const handleWeight = (value) => onFilterChange('weight', value);
    const handleHeight = (value) => onFilterChange('height', value);
    

    return (
        <div>
            <div className="filtros">
                <div>
                    <Dropdown 
                        title="GENERACIÓN"
                        options = {[
                            { label: "Todas", value: "all" },
                            { label: "Primera", value: "gen1" },
                            { label: "Segunda", value: "gen2" },
                            { label: "Tercera", value: "gen3" },
                            { label: "Cuarta", value: "gen4" },
                            { label: "Quinta", value: "gen5" },
                            { label: "Sexta", value: "gen6" },
                            { label: "Séptima", value: "gen7" },
                        ]}
                        onSelect={handleGeneration}
                    />
                    <Dropdown 
                        title="TIPOS"
                        options={[
                            { label: "Todos",      value: "all" },
                            { label: "Normal",     value: "normal" },
                            { label: "Lucha",      value: "fighting" },
                            { label: "Volador",    value: "flying" },
                            { label: "Tierra",     value: "ground" },
                            { label: "Roca",       value: "rock" },
                            { label: "Bicho",      value: "bug" },
                            { label: "Fantasma",   value: "ghost" },
                            { label: "Acero",      value: "steel" },
                            { label: "Fuego",      value: "fire" },
                            { label: "Agua",       value: "water" },
                            { label: "Planta",     value: "grass" },
                            { label: "Eléctrico",  value: "electric" },
                            { label: "Psíquico",   value: "psychic" },
                            { label: "Hielo",      value: "ice" },
                            { label: "Dragón",     value: "dragon" },
                            { label: "Siniestro",  value: "dark" },
                            { label: "Hada",       value: "fairy" },
                        ]}
                        onSelect={handleType}
                    />
                    <Dropdown 
                        title="PESO"
                        options={[
                            { label: "Todos",      value: "all" },
                            { label: "0 - 5 kg.",     value: "weight1" },
                            { label: "5 - 20 kg.",      value: "weight2" },
                            { label: "20 - 50 kg.",    value: "weight3" },
                            { label: "50 - 100 kg.",     value: "weight4" },
                            { label: "100 - 200 kg.",       value: "weight5" },
                            { label: "200 - 400 kg.",      value: "weight6" },
                            { label: "400 - 600 kg.",   value: "weight7" },
                            { label: "> 600 kg.",      value: "weight8" },
                        ]}
                        onSelect={handleWeight}
                    />
                    <Dropdown 
                        title="ALTURA"
                        options={[
                            { label: "Todos",      value: "all" },
                            { label: "0 - 0.5 m.",     value: "height1" },
                            { label: "0.5 - 1 m.",      value: "height2" },
                            { label: "1 - 2 m.",    value: "height3" },
                            { label: "2 - 5 m.",     value: "height4" },
                            { label: "5 - 8 m.",       value: "height5" },
                            { label: "8 - 12 m.",      value: "height6" },
                            { label: "> 12 m.",      value: "height7" },
                        ]}
                        onSelect={handleHeight}
                    />
                </div>
                <div>
                    <Buscar onSearch={(nombre) => onFilterChange('search', nombre)}/>
                                                {/* IGUAL QUE LOS OTROS FILTROS, PERO ESTE POR nombre.*/}
                                                {/* LO MANDA A allFilters.jsx */}
                </div>
            </div>
        </div>
    )
}
export default AllDropdowns;