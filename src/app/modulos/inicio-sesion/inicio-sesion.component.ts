import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  constructor() { }

  ab:boolean=true;
  b:String="";
  hide = true;
  ngOnInit(): void {
  }

  profileFormAdmin = new FormGroup({
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    email: new FormControl('',[Validators.required, Validators.email]),
    contrasena: new FormControl('',Validators.required),
  });

  profileFormPaciente = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    contrasena: new FormControl('',Validators.required),
  });

  profileFormDoctor = new FormGroup({
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    contrasena: new FormControl('',Validators.required),
  });

  a(){}
}
