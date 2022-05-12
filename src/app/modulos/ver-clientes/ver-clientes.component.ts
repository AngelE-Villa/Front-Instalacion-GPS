import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../modelos/Cliente";
import {ClienteService} from "../../servicios/ClienteService";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.css']
})
export class VerClientesComponent implements OnInit {

  columnas: string[] = ['id', 'cedula', 'nombre', 'direccion','correo','editar','eliminar'];

  // @ts-ignore
  dataSource: MatTableDataSource<Cliente>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  datos: Cliente[] = [];


  constructor(private clienteservice:ClienteService) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.listaClientes();
  }


  listaClientes(){
    this.clienteservice.getClient().subscribe(value => {
      this.datos=value
      this.dataSource = new MatTableDataSource(this.datos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}

