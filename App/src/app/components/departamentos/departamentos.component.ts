import { Component, OnInit } from '@angular/core';
import { DepartamentoDTO } from '../../models/departamento';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {

  displayedColumns = ['codigo', 'nombre'];
  isLoading: boolean;
  departamentos: DepartamentoDTO[];

  constructor(
    private deptSvc: DepartamentoService
  ) { }

  ngOnInit(): void {

    this.isLoading = true;
    
    this.deptSvc.getAll().subscribe(
      resp => {
        this.departamentos = resp;
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      }
    )

  }

}
