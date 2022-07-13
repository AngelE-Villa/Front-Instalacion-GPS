import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Modelo} from "../../modelos/Modelo";
import {MensajesMail} from "../../modelos/MensajesMail";
import {ModeloService} from "../../servicios/ModeloService";
import {EmailService} from "../../servicios/EmailService";
import {Plan} from "../../modelos/Plan";

@Component({
  selector: 'app-mesajes-email',
  templateUrl: './mesajes-email.component.html',
  styleUrls: ['./mesajes-email.component.css']
})
export class MesajesEmailComponent implements OnInit {

  titulo="";
  editing=false;
  creating=false;

  mensage:MensajesMail=new MensajesMail();

  listaEmail:Array<MensajesMail>=[];

  @ViewChild('dialogMessage')
  dialogMessage!: TemplateRef<any>;

  constructor(private messageService:EmailService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarMensajes();
  }

  abrirdialoMessager(){
    this.editing=false;
    this.creating=true;
    this.titulo="Crear Mensaje"
    this.dialog.open(this.dialogMessage,{
      height: '70%',
      width: '30%',
    });
  }

  //----------------Validaciones-----------------
  validacionMensaje = new FormGroup({
    emiMail:new FormControl('',[Validators.required, Validators.email]),
    tipoMensaje: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    title: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    mensaje:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
  });

  public hasError = (controlName: string, errorName: string) =>{
    return this.validacionMensaje.controls[controlName].hasError(errorName);
  }
  //----------------------metodo para crear-----------------------
  crearMensaje(){
    this.messageService.crearMensajeEmail(this.mensage).subscribe((data:any)=>{
      window.location.reload();
    })
  }
  //----------------listado---------------------------
  listarMensajes(){
    this.messageService.getMensajesEmail().subscribe((data:any)=>{
      this.listaEmail=data;
    })
  }


}
