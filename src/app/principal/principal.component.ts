import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../modelos/User";
import {Rol} from "../modelos/Rol";
import {Rol_Usuario} from "../modelos/Rol_Usuario";
import {Rol_UsuarioService} from "../servicios/Rol_UsuarioService";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private router:Router,private roles_userSevice:Rol_UsuarioService,public dialog: MatDialog) { }
  admin:boolean;
  instalador:boolean;
  id_persona:any;

  btnUno=false;
  btnDos=false;
  btnTres=false;
  btnCuatro=false;
  btnCinco=false;

  listrol=[];
  rol_us:Rol_Usuario = new Rol_Usuario();


  issloading=false;
  usuario:User = new User();

  dataSourceM:any;
  titulo="";
  editing=false;
  creating=false;

  @ViewChild('dialogRolesUs')
  dialogRolesUs!: TemplateRef<any>;


  ngOnInit(): void {
    this.id_persona= JSON.parse(sessionStorage['id']);
    this.roles_userSevice.getRol_Us_id_persona(this.id_persona).subscribe((data:any)=>{
        this.listrol=data;
        if (this.listrol.length!=0){
          let cont=0;
          for (let rol of this.listrol){
            if (cont==0){
              this.rol_us=rol;
              cont++;
            }
          }
          this.usuario=this.rol_us.usuario.nombre;
        }

      try {
        if(this.listrol.length==1){
          this.issloading=true;
          this.router.navigate(['']);
          //-- btns
          this.btnUno=true;
          this.btnDos=true;
          this.btnTres=true;
          this.btnCuatro=true;
          this.btnCinco=true;
          //-- btns-fin
          this.issloading=true;
        }else if(this.listrol.length>1){
          this.issloading=true;
          //Dioalogo
          this.titulo="Seleccione su Rol"
          this.dialog.open(this.dialogRolesUs);

        }
        else {
          this.router.navigate(['']);
          this.issloading=false;
        }
      }catch (e){
        this.issloading=false;
        console.log("ERROR")
      }
    });


  }

  cerrarSesion(){
    sessionStorage.clear();
    window.location.reload();
  }
}
