import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Cliente} from "../modelos/Cliente";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn:"root"
})
export class ClienteService{
  base_url="http://localhost:9898/api/client/";

  constructor(private httpClient:HttpClient) {
  }

  getClient():Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(this.base_url);
  }

  editarClient(cliente:Cliente, id:String){
    return this.httpClient.put(this.base_url+"update-client/"+id, cliente);
  }

  crearClient(cliente:Cliente){
    return this.httpClient.put(this.base_url+"create-client/", cliente);
  }

  deleteClient(cliente:Cliente, id:String){
    return this.httpClient.put(this.base_url+"delete/"+id, cliente);
  }

}
