
export interface OfertaPractica {
  idOfertaPractica: number;
  titulo: string;
  descripcion: string;
  fechaPublicacion: string;
}

export interface CreateOfertaPracticaRequest {
  idOfertaPractica: number;
  titulo: string;
  descripcion: string;
  fechaPublicacion: string;
}