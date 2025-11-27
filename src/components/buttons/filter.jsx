import { useState } from 'react';
import '../../styles/filters.css'

const Dropdown = ({ title, options = [ ], onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState(title)

    // -- PARA ALTERNAR VALOR DE isOpen  --
    const toggleDropdown = () => setIsOpen(!isOpen)


    // --- CONSULTAR  allFilters.jsx --> SELECCIONA ENTRE LAS options EL value CORRESPONDIENTE
    const handleOptionClick = (filter) => {
        setSelectedLabel(filter.value);
        onSelect(filter.value);
        setIsOpen(!isOpen);    
    }


    return (
        <div className="dropdown">
            <button 
                className="dropdown-toggle" 
                onClick={toggleDropdown}
                onBlur={() => setIsOpen(false)}                      // PARA QUE SE DESSELECCIONE SI "pierde foco" 
            >
                {title}
            </button>

            {isOpen && (
                <ul>
                    {options.map((filter, id) => (
                        <li 
                            kei={id}
                            onMouseDown={(e) => e.preventDefault()}  // PARA QUE EL onBlur NO BLOQUEEE el estilo SELECTED
                            onClick={() => handleOptionClick(filter)}
                            className={selectedLabel === 
                                (filter.value) ? 'selected' : ''}
                            >
                            <span>
                                {filter.label}  {/* label ES EL TEXTO DE CADA FILTRO*/} 
                                                {/* value ES EL IDENTIFICADOR*/}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;