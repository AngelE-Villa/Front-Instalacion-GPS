import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../modelos/User";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private router:Router) { }

  issloading=false;
  usuario:User = new User();


  ngOnInit(): void {
    try {
      if(JSON.parse(sessionStorage['user']).length!=""){
        this.usuario=JSON.parse(sessionStorage['user']);
        this.issloading=true;
      }else {
        this.router.navigate(['']);
        this.issloading=false;
      }
    }catch (e){
      this.issloading=false;
      console.log("ERROR")
    }

  }

  cerrarSesion(){
    sessionStorage.clear();
    window.location.reload();
  }
}
