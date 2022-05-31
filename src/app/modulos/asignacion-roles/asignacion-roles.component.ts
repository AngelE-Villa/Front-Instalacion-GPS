import { Component, OnInit } from '@angular/core';
import {User} from "../../modelos/User";
import {UserService} from "../../servicios/UserService";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Gps} from "../../modelos/Gps";

@Component({
  selector: 'app-asignacion-roles',
  templateUrl: './asignacion-roles.component.html',
  styleUrls: ['./asignacion-roles.component.css']
})
export class AsignacionRolesComponent implements OnInit {


  columnas: string[] = ['id', 'nombre', 'correo', 'password','estado','editar','eliminar'];


  dataSource: MatTableDataSource<User>;

  datos: User[] = [];

  listaGps:Array<User>=[];

  users:User=new User();

  constructor(private serviciouser:UserService, private router:Router) { }

  ngOnInit(): void {
  }

}
