import {HttpClient} from "@angular/common/http";
import {User} from "../modelos/User";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Cliente} from "../modelos/Cliente";
import {LoginUser} from "../modelos/LoginUser";

@Injectable({
  providedIn:"root"
})
export class UserService{

  base_url="http://localhost:9898/api/user/";

  constructor(private httpClient:HttpClient) {
  }

  getUsers():Observable<User[]>{
    return this.httpClient.get(this.base_url).pipe(map(Response => Response as User[]))
  }

  crearUser(user:User){
    return this.httpClient.post(this.base_url, user);
  }

  login(login:LoginUser):Observable<LoginUser>{
    return this.httpClient.post<LoginUser>(this.base_url+"login/",login);
  }

}
