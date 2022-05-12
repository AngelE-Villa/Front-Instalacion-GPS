import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Vehiculo} from "../../modelos/Vehiculo";
import {ModeloService} from "../../servicios/ModeloService";
import {AccionesService} from "../../servicios/AccionesService";
import {Acciones} from "../../modelos/Acciones";
import {Servicio} from "../../modelos/Servicio";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {
  isLinear=true
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  vehiculo:Vehiculo=new Vehiculo();
  listaModelo:Array<any>=[];
  listaAcciones:Array<any>=[];
  acciones:Array<any>=[];

  // @ts-ignore
  selectedValue: string;
  // @ts-ignore
  selectedCar: string;

  constructor(private _formBuilder: FormBuilder, private servicioModelo:ModeloService, private servicioAcciones:AccionesService) {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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

  ngOnInit(): void {
    this.servicioModelo.getModelos().subscribe((data:any)=>{
      this.listaModelo=data;
    })
  }

  AccionesSeleccion(id:String){
    console.log(id)
    this.servicioAcciones.getAcciones().subscribe((data:any)=>{
      this.listaAcciones=data;
      console.log(this.listaAcciones)
      for (let m of this.listaAcciones){
        if (m.modelo.id_modelo==id){
          this.acciones.push(m);
          console.log(m)
        }
      }
    })
  }


}
