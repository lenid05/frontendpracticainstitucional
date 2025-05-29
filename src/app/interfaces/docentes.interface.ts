export interface docente {
    idDocente: number;
    tipoContratacion: String;
    salario: number;
    idUsuario: number;
  }
  export interface CreateDocenteRequest {
    idDocente: number;
    tipoContratacion: String;
    salario: number;
    
    idUsuario: number;
  }