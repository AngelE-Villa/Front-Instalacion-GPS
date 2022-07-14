import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../modelos/User";
import {UserService} from "../../servicios/UserService";
import {Router} from "@angular/router";
import {Rol} from "../../modelos/Rol";
import {RolService} from "../../servicios/RolService";
import {Rol_UsuarioService} from "../../servicios/Rol_UsuarioService";
import {Rol_Usuario} from "../../modelos/Rol_Usuario";

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.css']
})
export class EditarUserComponent implements OnInit {

  user:User=new User();
  userGet:User=new User();
  rol: Rol = new Rol();

  rol_us: Rol_Usuario = new Rol_Usuario();

  listaRol:Array<Rol>=[];

  constructor(private rolService:RolService,private servicioRol_us:Rol_UsuarioService,private serviciouser:UserService, private router:Router) { }

  ngOnInit(): void {

    this.rolService.getRol().subscribe((data:any)=>{
      this.listaRol=data
      console.log(this.listaRol)
    })

  }

  hide = true;
  accion:Boolean=true;

  formUser = new FormGroup({
    correo: new FormControl('',[Validators.required, Validators.email]),
    contra: new FormControl('',Validators.required),
    rol:new FormControl('',Validators.required),
  });

  regsitrar(){
    this.user.estado="Activo";
    this.rol_us.usuario=this.user;
    this.rol_us.rol=this.rol;
    console.log(this.rol_us)
    this.serviciouser.crearUser(this.user).subscribe((data:any)=>{
      this.userGet=data;
      this.rol_us.usuario=this.userGet;
      this.rol_us.rol=this.rol;
      console.log(this.rol_us)
      this.servicioRol_us.crearRol_Usuario(this.rol_us).subscribe((value)=>{
        this.router.navigate(['/asignacionroles'])
        console.log(value)
      });
    })
  }

}
