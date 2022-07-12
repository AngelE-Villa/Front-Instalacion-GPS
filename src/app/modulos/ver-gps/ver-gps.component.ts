import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Cliente} from "../../modelos/Cliente";
import {ClienteService} from "../../servicios/ClienteService";
import {Gps} from "../../modelos/Gps";
import {GpsService} from "../../servicios/GpsService";

@Component({
  selector: 'app-ver-gps',
  templateUrl: './ver-gps.component.html',
  styleUrls: ['./ver-gps.component.css']
})
export class VerGpsComponent implements OnInit {

  columnas: string[] = ['id', 'num_gps', 'num_sim', 'imei' , 'estado','editar','eliminar'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // @ts-ignore
  dataSource: MatTableDataSource<Gps>;

  datos: Gps[] = [];

  listaGps:Array<Gps>=[];

  constructor(private servicegps:GpsService) { }

  ngOnInit(): void {
    this.ListaGps();
  }

  ListaGps(){
    this.servicegps.getGps().subscribe((x:any) =>{
      this.listaGps=x
      for (let a of this.listaGps){
        this.datos.push(a);
        this.dataSource = new MatTableDataSource<any>(this.datos);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




export class ArticulosVh {
  constructor(public cliente: Cliente) {
    console.log(cliente)
  }
}
