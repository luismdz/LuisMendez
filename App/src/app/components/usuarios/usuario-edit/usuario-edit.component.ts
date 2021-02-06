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
  usuario: UsuarioDTO;
  departamentos: DepartamentoDTO[];
  usuarios: UsuarioDTO[];
  supervisores: any[];

  // Arreglo para mostrar datos en el select de "Cargos"
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

    // Creando el formulario reactivo
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

   }

  ngOnInit(): void {

    // Obtener listado de departamentos
    this.deptSvc.getAll().subscribe(
      (resp: any) => this.departamentos = resp
    );
    
    // Obtener listado de usuarios existentes para completar select de "Supervisores"
    this.usuarioSvc.getAll().subscribe(
      (resp: any) => {
        this.usuarios = resp;

        this.supervisores = this.usuarios;
      }, err => console.log(err)
    );

  }

  // Mostrar errores en mat-error
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
   // Mostrar errores en mat-error


  // Crear usuario llamando el metodo post del servicio usuario
  crearUsuario() {

    // Completando los campos del usuario con la info del form
    this.usuario = this.usuarioForm.value;

    const {nombres, apellidos} = this.usuario;

    // llamando al metodo post
    this.usuarioSvc.crear(this.usuario).subscribe(
      resp => {
        // Resultado existoso
        Swal.fire({
          icon: 'success',
          title: 'Nuevo usuario creado!',
          text: `El usuario ${nombres} ${apellidos} ha sido agregado exitosamente.`
        }).then(() => this.router.navigateByUrl('/usuarios'));
        
      },
      // Resultado erroneo
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
