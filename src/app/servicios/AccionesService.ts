import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Acciones} from "../modelos/Acciones";

@Injectable({
  providedIn:"root"
})
export class AccionesService{
  base_url="http://localhost:9898/api/accions/";

  constructor(private httpClient:HttpClient) {
  }

  getAcciones():Observable<Acciones>{
    return this.httpClient.get<Acciones>(this.base_url);
  }
}
