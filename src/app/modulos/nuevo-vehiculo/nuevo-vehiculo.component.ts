import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../modelos/Cliente";
import {Vehiculo} from "../../modelos/Vehiculo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClienteService} from "../../servicios/ClienteService";
import {VehiculoService} from "../../servicios/VehiculoService";

@Component({
  selector: 'app-nuevo-vehiculo',
  templateUrl: './nuevo-vehiculo.component.html',
  styleUrls: ['./nuevo-vehiculo.component.css']
})
export class NuevoVehiculoComponent implements OnInit {

  vehiculo:Vehiculo =new  Vehiculo();

  //Parametro
  id:any;

  //Editar o Crear
  editing:boolean=false;

  listaVehiculos:Array<any>=[];

  firstFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,route:ActivatedRoute,private vehiculoService:VehiculoService, private router:Router) {
    this.firstFormGroup = this._formBuilder.group({
      id: ['', Validators.required]
    });
    this.id=route.snapshot.params['id'];
    if (this.id){
      this.editing=true;
      this.vehiculoService.getVehiculos().subscribe((data:any)=>{
          this.listaVehiculos=data;
          this.vehiculo=this.listaVehiculos.find((m)=>{return m.id_vehiculo==this.id})
          console.log(this.vehiculo)
        }
      );
    }else {
      console.log("Crear")
    }
  }
  ngOnInit(): void {
  }

  Guardar(){
    if (this.id){
      this.vehiculoService.editarVehiculos(this.vehiculo,this.id).subscribe(value=>{
        this.router.navigate(['/vervehiculos'])
      })
    }

  }

}