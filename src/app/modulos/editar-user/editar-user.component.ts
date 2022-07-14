import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../modelos/User";
import {UserService} from "../../servicios/UserService";
import {ActivatedRoute, Router} from "@angular/router";
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
  //Parametro
  id:any;

  rol_us: Rol_Usuario = new Rol_Usuario();

  listaRol:Array<Rol>=[];

  idpersona:any;

  constructor(private rolService:RolService,
              private servicioRol_us:Rol_UsuarioService,
              private serviciouser:UserService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.idpersona=this.route.snapshot.params['idpersona'];
    this.listarRoles();
    this.listarUser(this.idpersona);
  }

  listarRoles(){
    this.rolService.getRol().subscribe((data:any)=>{
      this.listaRol=data
      console.log(this.listaRol)
    })
  }

  listarUser(id:any){
    this.serviciouser.getUserid(id).subscribe(value => {
      this.user=value;
    })
  }

  hide = true;
  accion:Boolean=true;

  formUser = new FormGroup({
    nombre: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    correo: new FormControl('',[Validators.required, Validators.email]),
    contra: new FormControl('',Validators.required),

  });

  UpdateUs(){
    this.serviciouser.updateUser(this.user).subscribe((data:any)=>{
    })
  }

}
