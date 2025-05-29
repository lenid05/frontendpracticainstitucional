export interface Usuarios{
   idUsuario: number;
   primerNombre: string;
   segundoNombre: number;
   primerApellido: string;
   segundoApellido: string;
   correo: string;
   contrasena: string;

}
export interface CreateUsuarioRequest {
   idUsuario: number;
   primerNombre: string;
   segundoNombre: number;
   primerApellido: string;
   segundoApellido: string;
   correo: string;
   contrasena: string;
 }