import { useNavigate } from "react-router-dom"
import BotonSubmenu from '../buttons/butsSubMenu'
import "./navbar.css"

const Navbar = ({ text }) => {
    
    // --- PARA NAVEGAR POR LOS MENUS --> App.jsx
    const navigate = useNavigate();


    return (
        <div>
            <div>
                <h2 className="titulo pb-2">{text}</h2>
            </div>
            <nav className="navbar">
                <BotonSubmenu
                    type="subMenu"
                    action={() => navigate("/main")}
                >
                    Pokemons.
                </BotonSubmenu>
                <BotonSubmenu
                    type="subMenu"
                    action={() => navigate("/profile")}
                >
                    Crear Perfil.
                </BotonSubmenu>
                <BotonSubmenu
                    type="subMenu"
                    action={() => navigate("/contact")}
                >
                    Contactos.
                </BotonSubmenu>
                <BotonSubmenu
                    type="subMenu"
                    action={() => navigate("/aboutMe")}
                >
                    About Me.
                </BotonSubmenu>
            </nav>
        </div>
    )
}
export default Navbar;