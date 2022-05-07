import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../modelos/Cliente";
import {ClienteService} from "../../servicios/ClienteService";

@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.css']
})
export class VerClientesComponent implements OnInit {

  columnas: string[] = ['codigo', 'descripcion', 'precio', 'precios','correo','editar','eliminar'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  datos: Cliente[] = [];
  dataSource:any;

  listaUsers:Array<Cliente>=[];
  constructor(private service:ClienteService) { }

  ngOnInit(): void {
    this.service.getUser().subscribe((x:any) =>{
      this.listaUsers=x
      for (let a of this.listaUsers){
        this.datos.push(a);
        this.dataSource = new MatTableDataSource<any>(this.datos);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

}
export class ArticulosCl {
  constructor(public cliente:Cliente) {
    console.log(cliente)
  }

}
