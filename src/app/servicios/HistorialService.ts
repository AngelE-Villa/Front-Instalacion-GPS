import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Cliente} from "../modelos/Cliente";
import {HttpClient} from "@angular/common/http";
import {Historial} from "../modelos/Historial";

@Injectable({
  providedIn:"root"
})
export class HistorialService{
  base_url="http://localhost:9898/api/historial/";

  constructor(private httpClient:HttpClient) {
  }

  getHistorial():Observable<Historial[]>{
    return this.httpClient.get<Historial[]>(this.base_url);
  }

  crearHistorial(historial:Historial){
    return this.httpClient.post(this.base_url+"create-historial/", historial);
  }

  getByidCliente(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+"cli-hist/"+id);
  }

  deleteClient(cliente:Cliente, id:String){
    return this.httpClient.put(this.base_url+"delete/"+id, cliente);
  }

}
