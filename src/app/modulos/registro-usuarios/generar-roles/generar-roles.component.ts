import { Component, OnInit } from '@angular/core';
import {Rol} from "../../../modelos/Rol";
import {RolService} from "../../../servicios/RolService";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../modelos/User";
import {UserService} from "../../../servicios/UserService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-generar-roles',
  templateUrl: './generar-roles.component.html',
  styleUrls: ['./generar-roles.component.css']
})
export class GenerarRolesComponent implements OnInit {

  listaRol:Array<Rol>=[];
  form: FormGroup;
  user:User=new User();
  idpersona:any;

  constructor(private rolService:RolService,
              private _formBuilder: FormBuilder,
              private userService:UserService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.listarRoles();
    this.idpersona=this.route.snapshot.params['idpersona'];
    if (this.idpersona){
      this.cargarUsuario(this.idpersona);
    }
  }

  listarRoles(){
    this.rolService.getRol().subscribe((data:any)=>{
      this.listaRol=data
      console.log(this.listaRol)
    })
  }

  public onChange(event, rol: Rol) {
    console.log(rol);
    const checked = event.target.checked;
    if (checked) {
      this.user.roles.push(rol);
    } else {
      this.user.roles = this.user.roles.filter(
        (r) => r.rolNombre != rol.rolNombre
      );
    }
  }

  submit(){
    //Metodo para guardar todavia
    console.log(this.user)
  }

  cargarUsuario(id: number) {
    this.userService.getUserid(id).subscribe((usuario) => {
      if (!usuario) {
        return this.irListaUsuarios();
      }
      this.user = usuario;
      this.userService.getUserid(id).subscribe((usuario) => {
        this.user = usuario;

        for (let rol1 of this.user.roles) {
          for (let rol2 of this.listaRol) {
            if (rol1.id === rol2.id) {
              rol2.check = true;
            }
          }
        }
      });
    });
  }

  irListaUsuarios(){
    this.router.navigate(['/asignacionroles']);
  }
}
