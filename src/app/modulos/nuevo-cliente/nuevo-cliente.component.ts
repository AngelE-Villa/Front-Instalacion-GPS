import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Cliente} from "../../modelos/Cliente";
import {ActivatedRoute, Router} from "@angular/router";
import {ClienteService} from "../../servicios/ClienteService";
import {Servicio} from "../../modelos/Servicio";

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  cliente:Cliente =new  Cliente();

  //Parametro
  id:any;

  //Editar o Crear
  editing:boolean=false;

  //Lista de Clientes
  clientes:Array<any>=[];


  firstFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,route:ActivatedRoute,private clienteService:ClienteService, private router:Router) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.id=route.snapshot.params['id'];
    if (this.id){
      this.editing=true;
      this.clienteService.getClient().subscribe(data=>{
          this.cliente=data.filter(value => value.id_persona==this.id)[0];
          console.log(this.cliente)
        }
      );
    }else {
      console.log("Crear")
    }
  }


  ngOnInit(): void {
  }

  Guardar(){
    if (this.id){
      this.clienteService.editarClient(this.cliente,this.id).subscribe(value=>{
        this.router.navigate(['/verclientes'])
      })
    }

  }

}
