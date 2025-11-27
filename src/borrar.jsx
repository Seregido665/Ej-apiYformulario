import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from '../navbar/navbar'
import Input from "../input/input"
import BotonSubmenu from "../buttons/butsSubMenu"
import "../../styles/profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // --- ESTADO-OBJETO CON LAS DISTINTAS PROPIEDADES O CAMPOS ---
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]");
const usuarioEdit = usuariosGuardados.find(u => u.id === Number(id));

const [formData, setFormData] = useState(() => ({
    photo: usuarioEdit ? usuarioEdit.imagen : "",
    name: usuarioEdit ? usuarioEdit.nombre : "",
    email: usuarioEdit ? usuarioEdit.correo : "",
    number: usuarioEdit ? usuarioEdit.telefono : "",
    password: "",
    confirmPassword: ""
}));

    
    // -- FUNCIÓN PARA TODOS LOS inputs ---
    const handleChange = (e) => {
        const { name, value } = e.target;   // RECOGE EL TEXTO DE CADA input
        setFormData({
            ...formData,        // COGE EL OBJETO TAL Y COMO ESTE
            [name]: value       // Y LO ACTUALIZA
        });
    };


    // --- FUNCION PARA SUBIR LA IMAGEN ---> (FileReader)
    const handleImageChange = (event) => {
        const file = event.target.files[0];   // COGE EL ARCHIVO SELECICONADO (SOLO HABRA 1)
                                              // ESCRIBE [0] PORQUE files ES UN array
        if (file) {
            const reader = new FileReader();  
                // CREAMOS EL LECTOR CON FileReader() --> De la API nativa del navegador, 
                                                       // como localStorage, document o console

            reader.readAsDataURL(file); // CONVIERTE UN ARCHIVO binario EN base64 (leible por src="")
            reader.onload = () => {
                setFormData({
                    ...formData,
                    photo: reader.result   // ACTUALIZA EL ESTADO-OBJETO Y LE AÑADE LA "photo"
                });
            }
            
        } 
    };


    // --- FUNCION PRINCIPAL DEL FORMULARIO ---> Date.now() PARA EL id
    const handleForm = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]");

    if (id) {
        // --------- MODO EDITAR ---------
        const index = usuariosGuardados.findIndex(u => u.id === Number(id));

        usuariosGuardados[index] = {
            id: Number(id),
            imagen: formData.photo,
            nombre: formData.name,
            correo: formData.email,
            telefono: formData.number
        };

    } else {
        // --------- MODO CREAR ---------
        const nuevoUsuario = {
            id: Date.now(),
            imagen: formData.photo,
            nombre: formData.name,
            correo: formData.email,
            telefono: formData.number
        };

        usuariosGuardados.push(nuevoUsuario);
    }

    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    navigate("/contact");
};





    return (
        <div>
            <div className="menuTop">
                <Navbar 
                    type="navbar botones"
                    text="Nuevo usuario"
                />
                <div className="profile-container">
                    <h5 className="profile-title">Rellena el siguiente formulario.</h5>
                    <form 
                        className="profile-form"
                        onSubmit={handleForm}
                    >
                    <div>
                        <div className="profile-preview">
                            {formData.photo ? (
                                <img src={formData.photo}/>     // CON LA IMAGEN CARGADA
                            ) : (
                                <div>Foto</div>              // O SIN NADA
                            )}
                            </div>

                            <label className="upload-button">
                                Buscar imagen
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="photo-input"
                                    className="hidden-file-input"
                                />
                            </label>
                        </div>
                    <Input
                            type="profile-input"
                            value={formData.name}
                            name="name"
                            text="Nombre"
                            action={handleChange} />   
                        <Input
                            type="profile-input"
                            value={formData.email}
                            name="email"
                            text="Correo"
                            action={handleChange} />
                        <Input
                            type="profile-input"
                            value={formData.number}
                            name="number"
                            text="Teléfono"
                            action={handleChange} />
                        <Input
                            type="profile-input" 
                            value={formData.password}
                            name="password"
                            text="Contraseña"
                            action={handleChange}
                            inputType="password" />     {/* AL TENER inputType="password" --> ...*/}
                        <Input
                            type="profile-input"
                            value={formData.confirmPassword}
                            name="confirmPassword"
                            text="Confirmar Contraseña"
                            action={handleChange}
                            inputType="password" />     {/* AL TENER inputType="password" --> ...*/}
                        
                        <BotonSubmenu type="submit btn-primary">
                            Subir Datos.
                        </BotonSubmenu>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Profile;