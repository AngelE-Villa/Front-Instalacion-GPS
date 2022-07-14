import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Rol} from "../modelos/Rol";
import {Modelo} from "../modelos/Modelo";


@Injectable({
  providedIn:"root"
})
export class RolService{
  base_url="http://localhost:9898/rol/";

  constructor(private httpClient:HttpClient) {
  }

  getRol():Observable<Rol[]>{
    return this.httpClient.get<Rol[]>(this.base_url);
  }

  crearRol(rol:Rol){
    return this.httpClient.post(this.base_url+"create-rol/", rol);
  }



}
