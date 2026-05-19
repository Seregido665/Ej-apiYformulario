import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BotonSubmenu from '../buttons/butsSubMenu'
import "./navbar.css"

interface NavbarProps {
  text: string;
}

const Navbar = ({ text }: NavbarProps) => {
    const navigate = useNavigate();

    const [hayUsuarios, setHayUsuarios] = useState<boolean>(() => {
        // unknown[] porque solo necesitamos .length.
        const guardados = JSON.parse(localStorage.getItem("usuarios") || "[]") as unknown[];
        return guardados.length > 0;
    });

    useEffect(() => {
        const comprobar = (): void => {
            const guardados = JSON.parse(localStorage.getItem("usuarios") || "[]") as unknown[];
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
