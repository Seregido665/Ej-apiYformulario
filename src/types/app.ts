// - Usuario guardado en localStorage: donde persiste como "usuarios" -
export interface Usuario {
  id: number;
  imagen: string;
  nombre: string;
  correo: string;
  telefono: string;
}

// - Filtros de los Pokemon -
export interface Filters {
  generation: string;
  type: string;
  species: string;
  weight: string;
  height: string;
  search?: string;
}

// - Formulario de perfil -
export interface ProfileFormData {
  photo: string;
  name: string;
  email: string;
  number: string;
  password: string;
  confirmPassword: string;
}
