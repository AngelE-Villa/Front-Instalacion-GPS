import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Cliente} from "../../modelos/Cliente";
import {MatTableDataSource} from "@angular/material/table";
import {ClienteService} from "../../servicios/ClienteService";
import {MatPaginator} from "@angular/material/paginator";
import {AccionesService} from "../../servicios/AccionesService";
import {ModeloService} from "../../servicios/ModeloService";
import {Modelo} from "../../modelos/Modelo";
import {Acciones} from "../../modelos/Acciones";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nuevo-modelo-gps',
  templateUrl: './nuevo-modelo-gps.component.html',
  styleUrls: ['./nuevo-modelo-gps.component.css']
})
export class NuevoModeloGpsComponent implements OnInit {

  columnasM: string[] = ['idM','nombreM','EstadoM','Acciones','editar','eliminar'];


  @ViewChild(MatPaginator, { static: true }) paginatorM!: MatPaginator;


  datosM: Modelo[] = [];
  dataSourceM:any;
  titulo="";
  editing=false;
  creating=false;
  idmodelo:any;


  modelo:Modelo=new Modelo();
  accion:Acciones=new Acciones();
  accionSet:Acciones=new Acciones();

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  @ViewChild('dialogRefAc')
  dialogRefAc!: TemplateRef<any>


  datosA: Acciones[] = [];
  dataSourceA:any;

  listaModelos:Array<Modelo>=[];
  listaAcciones=[];
    constructor(private modeloservice:ModeloService,
                private accionesservice:AccionesService,
                public dialog: MatDialog,
                private router:Router) { }

  ngOnInit(): void {
    this.modeloservice.getModelos().subscribe((x:any) =>{
      this.listaModelos=x
      for (let a of this.listaModelos){
        this.datosM.push(a);
        this.dataSourceM = new MatTableDataSource<any>(this.datosM);
        this.dataSourceM.paginator = this.paginatorM;
      }
    })

  }

  //Filtro modelos
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceM.filter = filterValue;
  }

  abrirdialogoC(){
      this.editing=false;
      this.creating=true;
      this.titulo="Crear Modelo"
      this.dialog.open(this.dialogRef);
  }

  abrirdialogoEdi(id:String){
    this.editing=true;
    this.creating=false;
      this.modeloservice.getModelos().subscribe((data:any)=>{
        this.modelo=data.find((m)=>{return m.id_modelo==id})
        this.titulo="Editar Modelo"
        this.dialog.open(this.dialogRef);
      })
  }

  crearModelo(){
      this.modelo.estado="Activo"
    this.modeloservice.crearModelo(this.modelo).subscribe((data:any)=>{
      window.location.reload();
    })
  }

  eliminarModelo(id:String){
    this.modeloservice.deleteModelo(id).subscribe((data:any)=>{
      window.location.reload();
    })
  }

  editarModelo(){
    this.modeloservice.updateModelo(this.modelo,this.modelo.id_modelo).subscribe((data:any)=>{
      window.location.reload();
    })
  }

  //Acciones
  abrirdialogoAcciones(id:String){
    this.idmodelo=id;
      this.accionesservice.getAcciones().subscribe((data:any)=>{
        this.listaAcciones=data.filter(value=>value.modelo.id_modelo==id)
        this.accion=data.find(m=>{return m.modelo.id_modelo==id})
        console.log(this.listaAcciones)
        this.dialog.open(this.dialogRefAc);
      })
  }

  agregarAcciones(){

      this.accionSet.modelo=this.idmodelo;
    console.log(this.accionSet)

     this.accionesservice.crearAccion(this.accionSet).subscribe((data:any)=>{
        window.location.reload();
      })
  }

}




