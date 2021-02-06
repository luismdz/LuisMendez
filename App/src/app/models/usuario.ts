import { DepartamentoDTO } from './departamento';

export interface UsuarioDTO {
  id?: number;
  nombres: string;
  apellidos: string;
  genero: string;
  cedula: string;
  cargo: string;
  fechaNacimiento: string;
  supervisor?: {
    id: number,
    nombres: string,
    apellidos: string,
    cargo: string
  };
  departamento?: DepartamentoDTO;
}