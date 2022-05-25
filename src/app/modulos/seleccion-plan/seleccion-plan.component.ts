import { Component, OnInit } from '@angular/core';
import {PlanService} from "../../servicios/PlanService";
import {Plan} from "../../modelos/Plan";

@Component({
  selector: 'app-seleccion-plan',
  templateUrl: './seleccion-plan.component.html',
  styleUrls: ['./seleccion-plan.component.css']
})
export class SeleccionPlanComponent implements OnInit {

  constructor(private servicioPlan:PlanService) { }
  listaPlanes:Array<Plan>=[];

  ngOnInit(): void {
    this.servicioPlan.getPlanes().subscribe((data:any)=>{
      this.listaPlanes=data;
    })
  }

}
