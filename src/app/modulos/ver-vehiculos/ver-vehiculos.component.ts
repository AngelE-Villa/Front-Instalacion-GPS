import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../modelos/Cliente";
import {ClienteService} from "../../servicios/ClienteService";
import {VehiculoService} from "../../servicios/VehiculoService";
import {Vehiculo} from "../../modelos/Vehiculo";

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

  listaVehiculos:Array<Vehiculo>=[];

  constructor(private vehiculoservice:VehiculoService) { }

  ngOnInit(): void {
    this.vehiculoservice.getVehiculos().subscribe((x: any) => {
      this.listaVehiculos = x
      for (let a of this.listaVehiculos) {
        this.datos.push(a);
        this.dataSource = new MatTableDataSource<any>(this.datos);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

}
export class ArticulosVv {
  constructor(public vehiculo: Vehiculo) {
    console.log(vehiculo)
  }
}
