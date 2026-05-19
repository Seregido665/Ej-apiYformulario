import { useState } from 'react';
import '../../styles/filters.css'

interface FilterOption {
  label: string; 
  value: string; 
}

interface DropdownProps {
  title: string;
  options?: FilterOption[];
  onSelect: (value: string) => void;
}

const Dropdown = ({ title, options = [], onSelect }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedLabel, setSelectedLabel] = useState<string>(title)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleOptionClick = (filter: FilterOption) => {
        setSelectedLabel(filter.value);
        onSelect(filter.value);
        setIsOpen(!isOpen);
    }


    return (
        <div className="dropdown">
            <button
                className="dropdown-toggle"
                onClick={toggleDropdown}
                onBlur={() => setIsOpen(false)}                    
            >
                {title}
            </button>

            {isOpen && (
                <ul>
                    {options.map((filter, id) => (
                        <li
                            key={id}
                            onMouseDown={(e) => e.preventDefault()}  // PARA QUE EL onBlur NO BLOQUEEE el estilo SELECTED
                            onClick={() => handleOptionClick(filter)}
                            className={selectedLabel ===
                                (filter.value) ? 'selected' : ''}
                            >
                            <span>
                                {filter.label} 
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
