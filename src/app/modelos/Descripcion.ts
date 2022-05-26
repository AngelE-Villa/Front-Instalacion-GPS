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

  constructor(estado: any, gps: Gps, vehiculo: Vehiculo) {
    this.estado = estado;
    this.gps = gps;
    this.vehiculo = vehiculo;
  }
}
