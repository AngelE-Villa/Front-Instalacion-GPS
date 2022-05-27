import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../modelos/Cliente";
import { MatSort } from "@angular/material/sort";
import {ClienteService} from "../../servicios/ClienteService";
import {VehiculoService} from "../../servicios/VehiculoService";
import {Vehiculo} from "../../modelos/Vehiculo";
import {Servicio} from "../../modelos/Servicio";
import { MatDialog } from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ver-vehiculos',
  templateUrl: './ver-vehiculos.component.html',
  styleUrls: ['./ver-vehiculos.component.css']
})
export class VerVehiculosComponent implements OnInit {

  columnas: string[] = ['id', 'placa', 'clave', 'vehiculo', 'año','kilometraje','cliente','editar','eliminar'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  datos: Vehiculo[] = [];
  dataSource:any;
  id:any;

  vehiculo:Vehiculo =new  Vehiculo();

  titulo="";
  editing=false;
  creating=false;


  @ViewChild('dialogNvehiculo')
  dialogNvehiculo!: TemplateRef<any>;

  cliente:Cliente=new Cliente();

  servicio:Vehiculo=new Vehiculo();

  listaVehiculos:Array<Vehiculo>=[];

  constructor(private vehiculoservice:VehiculoService,private route:ActivatedRoute,
              private clienteService:ClienteService,public dialog: MatDialog) { }

  ngOnInit(): void {


    this.id=this.route.snapshot.params['id'];
    this.clienteService.getByidCliente(this.id).subscribe((vs:any)=>{
      this.cliente=vs;

      this.vehiculoservice.getVehiculos().subscribe((x: any) => {
        this.listaVehiculos = x
        for (let a of this.listaVehiculos) {
          if(a.cliente.id_persona==this.cliente.id_persona){
            this.datos.push(a);
            this.dataSource = new MatTableDataSource<any>(this.datos);
            this.dataSource.paginator = this.paginator;
          }

        }
      })

    })

  }


  abrirdialogoVehiculos(){
    this.editing=false;
    this.creating=true;
    this.titulo="Crear Vehiculos"
    this.dialog.open(this.dialogNvehiculo);
  }

  crearVehiculo(){
    this.vehiculo.cliente.id_persona=this.id;
    console.log(this.vehiculo)
    this.vehiculoservice.crearVehiculos(this.vehiculo).subscribe((data:any)=>{
      window.location.reload();
    })
  }


}
export class ArticulosVv {
  constructor(public vehiculo: Vehiculo) {
    console.log(vehiculo)
  }
}
