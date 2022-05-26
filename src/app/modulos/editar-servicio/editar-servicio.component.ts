import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Servicio} from "../../modelos/Servicio";
import {ServicioService} from "../../servicios/ServicioService";
import {ActivatedRoute} from "@angular/router";
import {Descripcion} from "../../modelos/Descripcion";
import {DescripcionService} from "../../servicios/DescripcionService";
import {GpsService} from "../../servicios/GpsService";
import {Gps} from "../../modelos/Gps";
import {AccionesService} from "../../servicios/AccionesService";
import {Modelo} from "../../modelos/Modelo";

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {

  servicio:Servicio=new Servicio();
  servicioSet:Servicio=new Servicio();
  gps:Gps=new Gps();
  gpsSet:Gps=new Gps();
  modelo:Modelo=new Modelo();

  editarNFechas=false;
  editarNGps=false;

  listaacciones=[];


  id:any;

  cantidad:any;

  buscarimei:any;

  constructor(private serviceService:ServicioService,
              private route:ActivatedRoute,
              private serviciodescripcion: DescripcionService,
              private servicioGps:GpsService,
              private servicioAcciones:AccionesService) { }

  ngOnInit(): void {
    //this.listaServicio();
  }

  /*listaServicio(){
    this.id=this.route.snapshot.params['id'];
    if (this.id){
      this.serviceService.getServices().subscribe(data=>{
          this.servicio=data.find((m)=>{return m.id_documentoservicio==this.id})
        }
      );
      this.serviciodescripcion.getDescrip().subscribe(data=>{
        this.detalle=data.find((m)=>{return m.documentoservicio.id_documentoservicio==this.id});
      })

    }
  }*/

  editarGps(){
   /* this.servicioSet=this.servicio;
    this.buscarimei=this.detalle.gps.imei_gps;
    this.editarNGps=true;
    this.editarNFechas=false;
    this.modelo=this.detalle.gps.modelo;
    this.servicioAcciones.getAcciones().subscribe(data => {
      this.listaacciones.pop()
      for (let ac of data) {
        if (ac.modelo.id_modelo == this.modelo.id_modelo) {
          this.listaacciones.push(ac);
        }
      }
    })*/
  }

  editarFechas(){
    this.editarNGps=false;
    this.editarNFechas=true;
  }

  buscarximei() {
    this.listaacciones.pop();
    this.servicioGps.getGps().subscribe((value: any) => {
      if (value.filter((data: any) => data.imei_gps == this.buscarimei).length == 0) {
        console.log("No imei")
      } else {
        this.gps = value.find((data: any) => {
          return data.imei_gps == this.buscarimei
        })

        this.modelo=this.gps.modelo;

        this.servicioAcciones.getAcciones().subscribe(data => {
          this.listaacciones.pop()
          for (let ac of data) {
            if (ac.modelo.id_modelo == this.modelo.id_modelo) {
              this.listaacciones.push(ac);
            }
          }
        })
      }
    })
  }

}
