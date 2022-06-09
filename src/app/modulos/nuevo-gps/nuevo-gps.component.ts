import { Component, OnInit } from '@angular/core';
import {Gps} from "../../modelos/Gps";
import {ModeloService} from "../../servicios/ModeloService";
import {Modelo} from "../../modelos/Modelo";
import {GpsService} from "../../servicios/GpsService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanService} from "../../servicios/PlanService";
import {Plan} from "../../modelos/Plan";

@Component({
  selector: 'app-nuevo-gps',
  templateUrl: './nuevo-gps.component.html',
  styleUrls: ['./nuevo-gps.component.css']
})
export class NuevoGpsComponent implements OnInit {
  gps:Gps=new Gps();
  plan:Plan=new Plan();
  modelo:Modelo=new Modelo();

  listaModelo:Array<any>=[];
  listaGps:Array<any>=[];


  constructor(private servicioModelo:ModeloService,
              private servicioGps:GpsService,
              private route:ActivatedRoute,
              private servicioPlan:PlanService,
              private router:Router) { }

//estado, imei_gps, num_gps, num_sim, id_modelo
  firstFormGroup = new FormGroup({
    imei_gps: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    num_gps: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    num_sim: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    estado: new FormControl('',[Validators.required, Validators.email]),
    id_modelo: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
      this.servicioModelo.getModelos().subscribe((data:any)=>{
        this.listaModelo=data/*.filter(value=>value.id_modelo==this.plan.modelo.id_modelo);*/
    })


    this.servicioGps.getGps().subscribe((data:any)=>{
      this.listaGps=data;
      console.log(this.listaGps)
    })
  }

  Guardar(){
    this.gps.modelo=this.modelo;
    console.log(this.modelo.id_modelo)
    this.gps.estado="Activo";
    console.log(this.gps)
    this.servicioGps.crearGps(this.gps).subscribe((data:any)=>{
      this.router.navigate(['/vergps'])
    })
  }

}
