import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PlanService} from "../../servicios/PlanService";
import {Plan} from "../../modelos/Plan";
import { MatDialog } from "@angular/material/dialog";
import {Modelo} from "../../modelos/Modelo";
import {Gps} from "../../modelos/Gps";
import {ModeloService} from "../../servicios/ModeloService";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-seleccion-plan',
  templateUrl: './seleccion-plan.component.html',
  styleUrls: ['./seleccion-plan.component.css']
})
export class SeleccionPlanComponent implements OnInit {


  constructor(private servicioPlan:PlanService,public dialog: MatDialog,private modeloService: ModeloService) { }
  listaPlanes:Array<Plan>=[];

  listaModelo:Array<Modelo>=[];

  plan:Plan =new Plan();

  modelo:Modelo =new Modelo();

  gps:Gps =new Gps();

  titulo="";
  editing=false;
  creating=false;

  @ViewChild('dialogNplan')
  dialogNplan!: TemplateRef<any>;

  ngOnInit(): void {
    this.listarModelo();
    this.listarPLanes();
  }

  listarPLanes(){
    this.servicioPlan.getPlanes().subscribe((data:any)=>{
      this.listaPlanes=data;
    })
  }

  listarModelo(){
    this.modeloService.getModelos().subscribe((data:any)=>{
      this.listaModelo=data;
    })
  }


  abrirdialogoPlanes(){
    this.plan=new Plan();
      this.titulo="Crear Plan"
    this.dialog.open(this.dialogNplan,{
      height: '70%',
      width: '30%',
    });
  }

  //----------------------
  //validacion de campos
  VNuevoPlanFormGroup = new FormGroup({

    nombre_p: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    costo_p: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    imagen:new FormControl('',Validators.required),
    descripcion_p:new FormControl('',Validators.required),
    costo: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    estado_plan:new FormControl('',Validators.required),
    modelo:new FormControl('',Validators.required),

  });
  public hasError = (controlName: string, errorName: string) =>{
    return this.VNuevoPlanFormGroup.controls[controlName].hasError(errorName);
  }
  ///cargar imagen
  cargarImg(e: any) {
    let img = e.target.files
    let reader = new FileReader();
    reader.readAsDataURL(img[0]);
    reader.onloadend = () => {

      this.plan.imagen = reader.result;
    }
  }


  GuardarPlan(){
    if(this.plan.descripcion_plan=='anual'){
      this.plan.num_descripcion_p=12;
    }else if(this.plan.descripcion_plan=='semestral'){
      this.plan.num_descripcion_p=6;
    }else if(this.plan.descripcion_plan=='cuatrimestral'){
      this.plan.num_descripcion_p=4;
    }else if(this.plan.descripcion_plan=='trimestral'){
      this.plan.num_descripcion_p=3;
    }else if(this.plan.descripcion_plan=='bimestral'){
      this.plan.num_descripcion_p=2;
    }else{
      this.plan.num_descripcion_p=1;
    }
    this.plan.modelo=this.modelo;
    console.log(this.plan);
    this.servicioPlan.crearPlan(this.plan).subscribe((data:any)=>{
      this.listarPLanes();
    })
  }

}
