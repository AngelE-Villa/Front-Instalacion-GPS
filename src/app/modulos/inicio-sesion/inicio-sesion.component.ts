import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../servicios/UserService";
import {User} from "../../modelos/User";
import {Router} from "@angular/router";
import {LoginUser} from "../../modelos/LoginUser";

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  login:LoginUser=new LoginUser();
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
    this.userService.login(this.login).subscribe(value => {
      if (value){
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('user', JSON.stringify(value));
        sessionStorage.setItem('AuthToken', JSON.stringify(value.token));
        sessionStorage.setItem('Autorities', JSON.stringify(value.authorities));
        this.issloading=true;
        this.router.navigate(['']).then(() => {
          window.location.reload();
        })
      }

    },error => {
      this.snackBar.open("Las credenciales ingresadas son incorrectas", "",{
        duration: 1 * 1000,
      });
      this.issloading=false;
      window.location.reload();
    })
  }
}
