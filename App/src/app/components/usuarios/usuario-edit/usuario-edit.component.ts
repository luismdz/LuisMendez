import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from '../../../services/departamento.service';
import { UsuarioService } from '../../../services/usuario.service';
import { DepartamentoDTO } from '../../../models/departamento';
import { UsuarioDTO } from '../../../models/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {

  usuarioForm: FormGroup;
  originalForm: any;
  usuario: UsuarioDTO;
  departamentos: DepartamentoDTO[];
  usuarios: UsuarioDTO[];
  supervisores: any[];
  cargos: string[] = [
    "Programador Lider",
    "Programador",
    "Jefe de Ventas",
    "Oficial de Ventas"
  ]

  // Getters
  get nombres():any {
    return this.usuarioForm.get('nombres');
  }
  
  get apellidos():any {
    return this.usuarioForm.get('apellidos');
  }

  get genero():any {
    return this.usuarioForm.get('genero');
  }

  get cedula():any {
    return this.usuarioForm.get('cedula');
  }

  get departamento():any {
    return this.usuarioForm.get('departamento');
  }


  constructor(
    private fb: FormBuilder,
    private deptSvc: DepartamentoService,
    private usuarioSvc: UsuarioService,
    private router: Router
  ) {

    this.usuarioForm = this.fb.group({
      nombres: new FormControl('', 
        [Validators.required, Validators.minLength(2)]),
      apellidos: new FormControl('', 
        [Validators.required, Validators.minLength(2)]),
      genero: new FormControl(null, [Validators.required]),
      cedula: new FormControl('', 
        [Validators.required, Validators.maxLength(13)]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      cargo: new FormControl(null, [Validators.required]),
      supervisor: new FormControl(''),
      departamento: new FormControl('', [Validators.required]),
    });

    this.originalForm = this.usuarioForm;

   }

  ngOnInit(): void {

    this.deptSvc.getAll().subscribe(
      (resp: any) => this.departamentos = resp
    );

    this.usuarioSvc.getAll().subscribe(
      (resp: any) => {
        this.usuarios = resp;

        this.supervisores = this.usuarios;
      }
    )

  }

  mostrarErroresNombres() {
    if(this.nombres) {
      
      if(this.nombres.hasError('required')) {
        return 'El campo Nombre es requerido.';
      }

      if(this.nombres.hasError('minlength')) {
        return `El campo debe tener por lo menos ${this.nombres.errors.minlength?.requiredLength} caracteres.`;
      }

    }

    return '';
  }

  mostrarErroresApellidos() {
    if(this.apellidos) {
      
      if(this.apellidos.hasError('required')) {
        return 'El campo Apellidos es requerido.';
      }

      if(this.apellidos.hasError('minlength')) {
        return `El campo debe tener por lo menos ${this.apellidos.errors.minlength?.requiredLength} caracteres.`;
      }

    }

    return '';
  }

  mostrarErroresCedula() {
    if(this.cedula) {
      
      if(this.cedula.hasError('required')) {
        return 'El campo Cedula es requerido.';
      }

      if(this.cedula.hasError('mask')) {
        return `El campo debe ser en el formato ${this.cedula?.errors?.mask.requiredMask}`;
      }

    }

    return '';
  }

  mostrarErroresDepartamento() {
    if(this.departamento) {
      
      if(this.departamento.hasError('required')) {
        return 'El campo departamento es requerido.';
      }

    }

    return '';
  }


  crearUsuario() {

    this.usuario = this.usuarioForm.value;
    const {nombres, apellidos} = this.usuario;

    this.usuarioSvc.crear(this.usuario).subscribe(
      resp => {
        
        Swal.fire({
          icon: 'success',
          title: 'Nuevo usuario creado!',
          text: `El usuario ${nombres} ${apellidos} ha sido agregado exitosamente.`
        }).then(() => this.router.navigateByUrl('/usuarios'));
        
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: `${err.message}`
        }).then(() => this.router.navigateByUrl('/actores'));
      }
    );
  }

}
