import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../modelos/User";
import {UserService} from "../../servicios/UserService";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Gps} from "../../modelos/Gps";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-asignacion-roles',
  templateUrl: './asignacion-roles.component.html',
  styleUrls: ['./asignacion-roles.component.css']
})
export class AsignacionRolesComponent implements OnInit {


  columnas: string[] = ['id', 'nombre', 'correo','estado','editar','eliminar'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  dataSource: MatTableDataSource<User>;

  datos: User[] = [];

  listaUser:Array<User>=[];

  users:User=new User();

  constructor(private serviciouser:UserService, private router:Router) { }

  ngOnInit(): void {

    this.serviciouser.getUsers().subscribe((x:any) =>{
      this.listaUser=x
      for (let a of this.listaUser){
        this.datos.push(a);
        this.dataSource = new MatTableDataSource<any>(this.datos);
        this.dataSource.paginator = this.paginator;

      }
    })
  }

}
