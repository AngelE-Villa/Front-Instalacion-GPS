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
  observacion: any;
  ubicacion:any;
  fecha_inst:any


  constructor(documentoservicio: Servicio, estado: any, gps: Gps, vehiculo: Vehiculo, observacion: any, ubicacion: any) {
    this.documentoservicio = documentoservicio;
    this.estado = estado;
    this.gps = gps;
    this.vehiculo = vehiculo;
    this.observacion = observacion;
    this.ubicacion = ubicacion;
  }
}
