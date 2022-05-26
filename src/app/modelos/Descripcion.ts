import {Gps} from "./Gps";
import {Servicio} from "./Servicio";
import {Vehiculo} from "./Vehiculo";

export class Descripcion{
  documentoservicio: Servicio = new Servicio();
  estado: any;
  gps: Gps = new Gps();
  id_documentodescripcion: any;
  nombre: any;
  vehiculo:Vehiculo=new Vehiculo();
  observaciones: any;
  ubicacion_gps:any;


  constructor(documentoservicio: Servicio, estado: any, gps: Gps, vehiculo: Vehiculo, observaciones: any, ubicacion_gps: any) {
    this.documentoservicio = documentoservicio;
    this.estado = estado;
    this.gps = gps;
    this.vehiculo = vehiculo;
    this.observaciones = observaciones;
    this.ubicacion_gps = ubicacion_gps;
  }
}
