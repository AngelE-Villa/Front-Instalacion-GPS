import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PlanService} from "../../servicios/PlanService";
import {Plan} from "../../modelos/Plan";
import { MatDialog } from "@angular/material/dialog";
import {Modelo} from "../../modelos/Modelo";
import {Gps} from "../../modelos/Gps";
import {ModeloService} from "../../servicios/ModeloService";


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
    this.servicioPlan.getPlanes().subscribe((data:any)=>{
      this.listaPlanes=data;
    })

    this.modeloService.getModelos().subscribe((data:any)=>{
      this.listaModelo=data;
    })
  }


  abrirdialogoPlanes(){
    this.editing=false;
    this.creating=true;
    this.titulo="Crear Plan"
    this.dialog.open(this.dialogNplan);
  }


  GuardarPlan(){
    this.plan.modelo=this.modelo;
    this.servicioPlan.crearPlan(this.plan).subscribe((data:any)=>{
      console.log(this.plan)
    })
  }

}
