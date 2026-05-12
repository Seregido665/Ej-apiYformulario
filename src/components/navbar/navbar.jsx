import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BotonSubmenu from '../buttons/butsSubMenu'
import "./navbar.css"

const Navbar = ({ text }) => {

    // --- PARA NAVEGAR POR LOS MENUS --> App.jsx
    const navigate = useNavigate();

    const [hayUsuarios, setHayUsuarios] = useState(() => {
        const guardados = JSON.parse(localStorage.getItem("usuarios") || "[]");
        return guardados.length > 0;
    });

    useEffect(() => {
        const comprobar = () => {
            const guardados = JSON.parse(localStorage.getItem("usuarios") || "[]");
            setHayUsuarios(guardados.length > 0);
        };
        window.addEventListener("storage", comprobar);
        window.addEventListener("usuariosActualizados", comprobar);
        return () => {
            window.removeEventListener("storage", comprobar);
            window.removeEventListener("usuariosActualizados", comprobar);
        };
    }, []);


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
                    disabled={!hayUsuarios}
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