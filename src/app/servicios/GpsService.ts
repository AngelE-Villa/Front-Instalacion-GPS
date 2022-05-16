import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Gps} from "../modelos/Gps";
import {Cliente} from "../modelos/Cliente";

@Injectable({
  providedIn:"root"
})
export class GpsService{
  base_url="http://localhost:9898/api/gps/";

  constructor(private httpClient:HttpClient) {
  }

  getGps():Observable<Gps[]>{
    return this.httpClient.get<Gps[]>(this.base_url);
  }

  crearGps(gps:Gps){
    return this.httpClient.post(this.base_url+"create-gps/", gps);
  }
}
