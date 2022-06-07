import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Vehiculo} from "../modelos/Vehiculo";

@Injectable({
  providedIn:"root"
})
export class VehiculoService{
  base_url="http://localhost:9898/api/vehiculo/";

  constructor(private httpClient:HttpClient) {
  }

  getVehiculos():Observable<any>{
    return this.httpClient.get<any>(this.base_url);
  }

  getVehiculo(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  getVehiculoCli(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+"cli/"+id);
  }

  editarVehiculos(vehiculo:Vehiculo, id:String){
    return this.httpClient.put(this.base_url+"update-vehiculo/"+id, vehiculo);
  }

  crearVehiculos(vehiculo:Vehiculo){
    return this.httpClient.post(this.base_url+"create-vehiculo/", vehiculo);
  }

}
