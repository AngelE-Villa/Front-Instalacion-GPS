import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Modelo} from "../modelos/Modelo";

@Injectable({
  providedIn:"root"
})
export class ModeloService{
  base_url="http://localhost:9898/api/models/";

  constructor(private httpClient:HttpClient) {
  }

  getModelos():Observable<Modelo>{
    return this.httpClient.get<Modelo>(this.base_url);
  }
}
