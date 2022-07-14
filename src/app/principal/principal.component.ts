import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../modelos/User";
import {Rol} from "../modelos/Rol";
import {Rol_Usuario} from "../modelos/Rol_Usuario";
import {Rol_UsuarioService} from "../servicios/Rol_UsuarioService";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatSidenav} from "@angular/material/sidenav";
import {LayoutModule, BreakpointObserver} from '@angular/cdk/layout';
import Swal from 'sweetalert2';
import {LoginUser} from "../modelos/LoginUser";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  admin=false;
  install=false;


  constructor(private router:Router,
              private roles_userSevice:Rol_UsuarioService,
              public dialog: MatDialog,
              private observer: BreakpointObserver) { }


  issloading=false;
  usuario:LoginUser= new LoginUser();
  roles=[];


  dataSourceM:any;
  titulo="";
  creating=false;
  isLogged = true;

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  @ViewChild('dialogRolesUs')
  dialogRolesUs!: TemplateRef<any>;


  ngOnInit(): void {
    this.usuario= JSON.parse(localStorage['user']);
    this.roles= JSON.parse(sessionStorage['Autorities']);
    console.log(this.usuario.authorities.length)
    if (this.usuario.token!=null){
      for (let au of this.roles){
        if(au.authority=='ROLE_ADMIN'){
          this.admin=true;
        }else if(au.authority=='ROLE_INSTALL'){
          this.install=true;
        }
      }
      this.issloading=true;
    }else {
      this.issloading=false;
      this.router.navigate([''])
    }


  }

  ngAfterContentInit() {
    if (this.admin || this.install){
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }

  }

  cerrarSesion(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']).then(value => {
      window.location.reload();
    })
  }
}
