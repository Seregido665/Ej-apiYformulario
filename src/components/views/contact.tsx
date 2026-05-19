import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Usuario from '../cardProfile/cardProfile'
import Navbar from '../navbar/navbar'
import "../../styles/contact.css"
import "../../styles/main.css"
import type { Usuario as UsuarioType } from '../../types/app'

const Contact = () => {
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);

    // --- CARGAR USUARIOS GUARDADOS ---
    useEffect(() => {
        const cargarUsuarios = (): void => {
            const datos = localStorage.getItem("usuarios");
            setUsuarios(JSON.parse(datos || "[]") as UsuarioType[]);
        };
        cargarUsuarios();
    }, []);


    // --- ELIMINAR UN USUARIO ---
    const eliminarUsuario = (out: number): void => {
        const usuariosActualizados = usuarios.filter(user => user.id !== out);      
        setUsuarios(usuariosActualizados);                                         
        localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));    
        window.dispatchEvent(new Event("usuariosActualizados"));
    };


    // --- EDITAR USUARIO ---
    const editarUsuario = (id: number): void => {
        navigate(`/profile/edit/${id}`);  
    };


    return (
        <div>
            <div className="menuTop">
                <Navbar
                    text="Contactos"
                />

                <div className="users-container">
                    <div className="users-grid">
                        {usuarios.length < 1 ? (
                            <p className="no-users-message">
                                No hay usuarios registrados.
                            </p>
                        ) : (
                            usuarios.map((user) => (
                                <Usuario
                                    key={user.id}
                                    img={user.imagen}
                                    name={user.nombre}
                                    mail={user.correo}
                                    number={user.telefono}
                                    actionDel={() => eliminarUsuario(user.id)}
                                    actionEdit={() => editarUsuario(user.id)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact;
