import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from '../navbar/navbar'
import Input from "../input/input"
import BotonSubmenu from "../buttons/butsSubMenu"
import "../../styles/profile.css"
import type { Usuario, ProfileFormData } from '../../types/app'

const Profile = () => {
    const navigate = useNavigate();

    const { id } = useParams<{ id?: string }>();
    const usuarioEdit = (JSON.parse(localStorage.getItem("usuarios") || "[]") as Usuario[])
                            .find(user => user.id === Number(id));


    // --- PROPIEDADES ---
    const [formData, setFormData] = useState<ProfileFormData>(() => ({
        photo: usuarioEdit ? usuarioEdit.imagen : "",
        name: usuarioEdit ? usuarioEdit.nombre : "",
        email: usuarioEdit ? usuarioEdit.correo : "",
        number: usuarioEdit ? usuarioEdit.telefono : "",
        password: "",
        confirmPassword: ""
    }));


    // -- FUNCIÓN PARA inputs ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    // --- FUNCION PARA SUBIR LA IMAGEN ---> (FileReader)
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); // CONVIERTE UN ARCHIVO binario EN base64 (leible por src="")
            reader.onload = () => {
                setFormData({
                    ...formData,
                    photo: reader.result as string   // ACTUALIZA Y AÑADE LA "photo"
                });
            }
        }
    };


    // --- FUNCION PRINCIPAL DEL FORMULARIO ---> Date.now() PARA EL id
    const handleForm = (e: React.FormEvent<HTMLFormElement>): void => {
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

        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || "[]") as Usuario[];

       if (id) {
            // --- MODO EDITAR ---
            const userId = Number(id);
            const edited = usuariosGuardados.findIndex(user => user.id === userId);
            usuariosGuardados[edited] = {
                id: userId,
                imagen: formData.photo,
                nombre: formData.name,
                correo: formData.email,
                telefono: formData.number
            };
        } else {
            // --- MODO CREAR ---
            const nuevoUsuario: Usuario = {
                id: Date.now(),         // FECHA EN milisegundos PARA UN id UNICO
                imagen: formData.photo,
                nombre: formData.name,
                correo: formData.email,
                telefono: formData.number
            };
            usuariosGuardados.push(nuevoUsuario);       
        }
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));  
    window.dispatchEvent(new Event("usuariosActualizados"));
    navigate("/contact");
    };


    return (
        <div>
            <div className="menuTop">
                <Navbar
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
                                    <img src={formData.photo}/>  
                                ) : (
                                    <div>Foto</div>            
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
                            action={handleChange} />
                        <Input
                            type="profile-input"
                            value={formData.confirmPassword}
                            name="confirmPassword"
                            text="Confirmar Contraseña"
                            action={handleChange} />

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
