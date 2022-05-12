import {Component, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../../modelos/Cliente";
import {MatTableDataSource} from "@angular/material/table";
import {ClienteService} from "../../servicios/ClienteService";
import {MatPaginator} from "@angular/material/paginator";
import {AccionesService} from "../../servicios/AccionesService";
import {ModeloService} from "../../servicios/ModeloService";
import {Modelo} from "../../modelos/Modelo";
import {Acciones} from "../../modelos/Acciones";

@Component({
  selector: 'app-nuevo-modelo-gps',
  templateUrl: './nuevo-modelo-gps.component.html',
  styleUrls: ['./nuevo-modelo-gps.component.css']
})
export class NuevoModeloGpsComponent implements OnInit {

  columnasM: string[] = ['idM','nombreM','editar','eliminar'];
  columnasA: string[] = ['idA','nombreA', 'modelo','editar','eliminar'];

  @ViewChild(MatPaginator, { static: true }) paginatorM!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginatorA!: MatPaginator;

  datosM: Modelo[] = [];
  dataSourceM:any;


  datosA: Acciones[] = [];
  dataSourceA:any;

  listaModelos:Array<Modelo>=[];
  listaAcciones:Array<Acciones>=[];
    constructor(private modeloservice:ModeloService,private accionesservice:AccionesService) { }

  ngOnInit(): void {
    this.modeloservice.getModelos().subscribe((x:any) =>{
      this.listaModelos=x
      for (let a of this.listaModelos){
        this.datosM.push(a);
        this.dataSourceM = new MatTableDataSource<any>(this.datosM);
        this.dataSourceM.paginator = this.paginatorM;
      }
    })

    this.accionesservice.getAcciones().subscribe((y:any) =>{
      this.listaAcciones=y
      for (let b of this.listaAcciones){
        this.datosA.push(b);
        this.dataSourceA = new MatTableDataSource<any>(this.datosA);
        this.dataSourceA.paginatorA = this.paginatorA;
      }
    })
  }

  //Filtro modelos
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceM.filter = filterValue;
  }

}
export class ArticulosAc {
  constructor(public acciones:Acciones) {
    console.log(acciones)
  }
}
export class ArticulosM {
  constructor(public modelo:Modelo) {
    console.log(modelo)
  }
}



