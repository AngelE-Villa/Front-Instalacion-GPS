import { Component, OnInit } from '@angular/core';
import {Gps} from "../../modelos/Gps";
import {ModeloService} from "../../servicios/ModeloService";
import {Modelo} from "../../modelos/Modelo";
import {GpsService} from "../../servicios/GpsService";

@Component({
  selector: 'app-nuevo-gps',
  templateUrl: './nuevo-gps.component.html',
  styleUrls: ['./nuevo-gps.component.css']
})
export class NuevoGpsComponent implements OnInit {
  gps:Gps=new Gps();
  modelo:Modelo=new Modelo();

  listaModelo:Array<any>=[];
  listaGps:Array<any>=[];


  constructor(private servicioModelo:ModeloService,private servicioGps:GpsService) { }

  ngOnInit(): void {
    this.servicioModelo.getModelos().subscribe((data:any)=>{
      this.listaModelo=data;
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
      console.log(this.listaGps)
    })
  }

}
