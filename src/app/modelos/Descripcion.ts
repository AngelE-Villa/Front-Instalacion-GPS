import {Gps} from "./Gps";
import {Servicio} from "./Servicio";

export class Descripcion{
  documentoservicio: Servicio = new Servicio();
  estado: any;
  gps: Gps = new Gps();
  id_documentodescripcion: any;
  nombre: any;
}
