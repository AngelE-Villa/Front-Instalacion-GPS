import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ArticulosCl} from "../ver-clientes/ver-clientes.component";
import {Articulo} from "../ver-servicios/ver-servicios.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-ver-gps',
  templateUrl: './ver-gps.component.html',
  styleUrls: ['./ver-gps.component.css']
})
export class VerGpsComponent implements OnInit {

  columnas: string[] = ['codigo', 'descripcion', 'precio'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  datos: Articulosgps[] = [];
  dataSource:any;

  constructor() { }

  ngOnInit(): void {
    for (let x = 1; x <= 100; x++)
      this.datos.push(new Articulo(x, `artículo ${x}`, Math.trunc(Math.random() * 1000)));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator;
  }

}

export class Articulosgps {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }

}
