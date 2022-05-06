import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hide = true;
  accion:Boolean=true;

  profileFormPaciente = new FormGroup({
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nombre: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    sexo: new FormControl('',Validators.required),
    telefono: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nacimiento: new FormControl('',Validators.required),
    correo: new FormControl('',[Validators.required, Validators.email]),
    contra: new FormControl('',Validators.required),
    sangre: new FormControl('',Validators.required),
    ocupacion: new FormControl('',Validators.required),
    estado: new FormControl('',Validators.required),

  });

  a(){}

}
