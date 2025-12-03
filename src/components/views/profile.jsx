import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from '../navbar/navbar'
import Input from "../input/input"
import BotonSubmenu from "../buttons/butsSubMenu"
import "../../styles/profile.css"

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    //--- SI HAY UN /id LE DECIMOS QUE ES DE UN USUARIO PARA EDITAR ---
    const usuarioEdit = JSON.parse(localStorage.getItem("usuarios") || "[]")
                            .find(user => user.id === Number(id));

                            
    // --- ESTADO-OBJETO CON LAS DISTINTAS PROPIEDADES O CAMPOS ---
    const [formData, setFormData] = useState(() => ({
        photo: usuarioEdit ? usuarioEdit.imagen : "",       // SI NO HAY DATO PARA EDITAR --> ""
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

        // -- VALIDACIONES --
            if (!formData.name.trim() || !formData.email.trim() || !formData.number.trim() || !formData.password.trim()) {
                alert("Completa todos los campos ¡por favor!");
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                alert("Las contraseñas no coinciden.");
                return;
            }

        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]");
            // EN EL localStorage ESTAN LOS USUARIOS ACTUALES,
            // NOS LOS GUARDAMOS.

       if (id) {
            // --- EDITAR ---
            const userId= Number(id);
            const edited = usuariosGuardados.findIndex(user => user.id === userId); 
                    // COGE EL USUARIO DEL /id DE LA URL
            usuariosGuardados[edited] = {
                id: userId,
                imagen: formData.photo,
                nombre: formData.name,
                correo: formData.email,
                telefono: formData.number
            };
        } else {
            // --- MODO CREAR ---
            const nuevoUsuario = {
                id: Date.now(),         // Date DA UNA FECHA EN milisegundos. PARA UN id UNICO
                imagen: formData.photo,
                nombre: formData.name,
                correo: formData.email,
                telefono: formData.number
            };
            usuariosGuardados.push(nuevoUsuario);       // AÑADE UN NUEVO ELEMENTO A LA LISTA. 
        }
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));  // Y ACTUALIZA LA LISTA.
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
                    <h4 className="profile-title">Rellena el siguiente formulario.</h4>
                    <form 
                        className="profile-form"
                        onSubmit={handleForm}
                    >
                        <div>
                            <div className="profile-preview">
                                {formData.photo ? (
                                    <img src={formData.photo}/>  // CON LA IMAGEN CARGADA
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
                            text="Nombre completo"
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