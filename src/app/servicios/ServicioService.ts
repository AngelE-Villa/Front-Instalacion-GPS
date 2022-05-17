import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Servicio} from "../modelos/Servicio";
import {Cliente} from "../modelos/Cliente";

@Injectable({
  providedIn:"root"
})
export class ServicioService{
  base_url="http://localhost:9898/api/docservicio/";

  constructor(private httpClient:HttpClient) {
  }

  getServices():Observable<Servicio[]>{
    return this.httpClient.get<Servicio[]>(this.base_url);
  }

  crearService(servicio:Servicio){
    return this.httpClient.post(this.base_url+"create-docservicio", servicio);
  }

}

