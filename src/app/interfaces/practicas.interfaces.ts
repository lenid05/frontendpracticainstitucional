// src/app/interfaces/practicas.interfaces.ts
export interface Practica {
  idPractica: number;
  idEstudiante: number;
  idDocente: number;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  idOfertaPractica: number;
}

export interface PracticaConInfo extends Practica {
  estudianteNombre: string;
  estudianteApellido: string;
  docenteNombre: string;
  docenteApellido: string;
  tituloOferta: string;
}

export interface CreatePracticaRequest {
  idPractica: number;
  idEstudiante: number;
  idDocente: number;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  idOfertaPractica: number;
}