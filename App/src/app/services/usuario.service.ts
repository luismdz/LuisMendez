import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioDTO } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = environment.apiURL + 'usuarios';

  constructor(
    private http: HttpClient
  ) { }

  crear(usuario: UsuarioDTO) {
    const cedula = usuario.cedula.substr(0,3) + '-' 
      + usuario.cedula.substr(3,7) + '-' 
      + usuario.cedula.substr(10,1);

    usuario.cedula = cedula;
    return this.http.post(this.apiUrl, usuario);
  }

  getAll() {
    return this.http.get(this.apiUrl);
  }

  getById(id:number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

}
