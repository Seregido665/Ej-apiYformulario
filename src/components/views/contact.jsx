import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Usuario from '../cardProfile/cardProfile'
import Navbar from '../navbar/navbar'
import "../../styles/contact.css"
import "../../styles/main.css"

const Contact = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    // --- CARGAR USUARIOS GUARDADOS ---
    useEffect(() => {
        const cargarUsuarios = () => {    
            const datos = localStorage.getItem("usuarios"); 
                    // CONSULTA EN localStorage SI ESTA LISTA DE DATOS ESTA.
            setUsuarios(JSON.parse(datos));     
                    // Y LOS AÑADE AL ARRAY setUsuarios...
                    // Como DATOS es un ARRAY, con esta linea seria suficiente.
                    // Si fuese un OBJETO: ---> Buscar como se hace  <---
        };
        cargarUsuarios();     
    }, []);
    

    // --- PARA ELIMINAR UN USUARIO ---
    const eliminarUsuario = (out) => {
        const usuariosActualizados = usuarios.filter(user => user.id !== out);      // CREA UNA LISTA NUEVA SIN EL PERFIL SELECCIONADO,
        setUsuarios(usuariosActualizados);                                          // REFRESCA LA FUNCION setUsuarios...
        localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));     // Y GUARDAR LA ACTUALIZACION DEL localStorage
    };


    // --- EDITAR USUARIO ---
    const editarUsuario = (id) => {
        navigate(`/profile/edit/${id}`);  // EN App.jsx CREAMOS UNA RUTA ESPECIFICA PARA EDITAR AL USUARIO CON id: "x"
    };


    return (
        <div>
            <div className="menuTop">
                <Navbar 
                    type="navbar botones"
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