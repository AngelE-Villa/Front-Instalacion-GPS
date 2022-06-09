import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Rol_Usuario} from "../modelos/Rol_Usuario";


@Injectable({
  providedIn:"root"
})
export class Rol_UsuarioService{
  base_url="http://localhost:9898/api/roluser/";

  constructor(private httpClient:HttpClient) {
  }

  getRol_Usuario():Observable<Rol_Usuario []>{
    return this.httpClient.get<Rol_Usuario []>(this.base_url);
  }

  getRol_Usuarios(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }

  getRol_Us_id_persona(id:String):Observable<any[]>{
    return this.httpClient.get<any[]>(this.base_url+id);
  }
  crearRol_Usuario(rol_us:Rol_Usuario){
    return this.httpClient.post(this.base_url+"create-roluser/", rol_us);
  }

}
