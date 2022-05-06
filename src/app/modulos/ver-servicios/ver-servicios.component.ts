import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-ver-servicios',
  templateUrl: './ver-servicios.component.html',
  styleUrls: ['./ver-servicios.component.css']
})
export class VerServiciosComponent implements OnInit {

  columnas: string[] = ['codigo', 'descripcion', 'precio','Editar','Eliminar'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  datos: Articulo[] = [];
  dataSource:any;

  constructor() { }

  ngOnInit(): void {
    for (let x = 1; x <= 100; x++)
      this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator;
  }

}

export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }

}
