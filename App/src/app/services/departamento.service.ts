import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { DepartamentoDTO } from '../models/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  apiUrl = environment.apiURL + 'departamentos';

  constructor(
    private http: HttpClient
  ) { }
  
  getAll() {
    return this.http.get(this.apiUrl).pipe(
      map((resp: any) => {
        
        const departamentos: DepartamentoDTO[] = resp.map((x:any) => {
          return <DepartamentoDTO> {
            codigo: x.codigo,
            nombre: x.nombre
          }
        });

        return departamentos;
      })
    );
  }
  
}
