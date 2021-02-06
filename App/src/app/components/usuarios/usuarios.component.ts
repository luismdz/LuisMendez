import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDTO } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns = ['cedula', 'nombre', 'cargo', 'genero', 'departamento', 'supervisor'];
  isLoading: boolean;
  usuario: UsuarioDTO;
  usuarios: UsuarioDTO[];

  constructor(
    private usuarioSvc: UsuarioService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.usuarioSvc.getAll().subscribe(
      (resp: any) => {
        //console.log(resp);
        this.usuarios = resp;
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      }
    )

  }

}
