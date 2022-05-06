import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {Articulo} from "../ver-servicios/ver-servicios.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-ver-vehiculos',
  templateUrl: './ver-vehiculos.component.html',
  styleUrls: ['./ver-vehiculos.component.css']
})
export class VerVehiculosComponent implements OnInit {

  columnas: string[] = ['codigo', 'descripcion', 'precio'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  datos: Articulos[] = [];
  dataSource:any;

  constructor() { }

  ngOnInit(): void {
    for (let x = 1; x <= 100; x++)
      this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator;

  }

}

export class Articulos {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }

}
