import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../modelos/User";
import {UserService} from "../../servicios/UserService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {

  user:User=new User();
  constructor(private serviciouser:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  hide = true;
  accion:Boolean=true;

  formUser = new FormGroup({
    nombre: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    telefono: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    correo: new FormControl('',[Validators.required, Validators.email]),
    contra: new FormControl('',Validators.required),
  });

  regsitrar(){
    this.user.estado="Activo"
    this.serviciouser.crearUser(this.user).subscribe((data)=>{
      this.router.navigate(['/iniciasesion'])
    })
  }

}
