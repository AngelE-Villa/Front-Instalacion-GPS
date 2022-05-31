import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Servicio} from "../modelos/Servicio";
import {Cliente} from "../modelos/Cliente";
import {Plan} from "../modelos/Plan";

@Injectable({
  providedIn:"root"
})
export class PlanService{
  base_url="http://localhost:9898/api/plan/";

  constructor(private httpClient:HttpClient) {
  }

  getPlanes():Observable<Plan[]>{
    return this.httpClient.get<Plan[]>(this.base_url);
  }

  getPlan(id:String):Observable<any>{
    return this.httpClient.get<any>(this.base_url+id);
  }
  crearPlan(plan:Plan){
    return this.httpClient.post(this.base_url+"create-plan/", plan);
  }

}
