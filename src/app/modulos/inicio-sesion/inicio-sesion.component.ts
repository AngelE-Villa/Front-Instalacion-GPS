import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../servicios/UserService";
import {User} from "../../modelos/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  correoU?:String;
  pswU?:String;
  user?:User = new User();

  constructor(private snackBar: MatSnackBar, private userService:UserService,private router:Router) { }

  ab:boolean=true;
  b:String="";
  hide = true;
  ngOnInit(): void {
  }
  issloading:boolean=false;

  profileFormUser = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    contrasena: new FormControl('',Validators.required),
  });


  iniciarSesion(){
    this.userService.getUsers().subscribe(value => {
      if(value.filter(value1 => value1.correo==this.correoU&&value1.password==this.pswU).length==0){
        this.snackBar.open("Usuario no existe, los credenciales ingresados no se encontraron", "",{
          duration: 1 * 1000,
        });
        this.issloading=false;
        console.log("Usuario no existe")
      }else {
        this.user=value.filter(value1 => value1.correo==this.correoU&&value1.password==this.pswU)[0];
        if(this.user.correo==this.correoU && this.user.password==this.pswU){
          sessionStorage.clear;
          sessionStorage.setItem('user', JSON.stringify(this.user.nombre));
          sessionStorage.setItem('id', JSON.stringify(this.user.id_persona));
          this.issloading=true;
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        }else{
          this.snackBar.open("Las credenciales ingresadas son incorrectas", "",{
            duration: 1 * 1000,
          });
          this.issloading=false;
        }
      }
    })
  }
}
