import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Vehiculo} from "../../modelos/Vehiculo";
import {ModeloService} from "../../servicios/ModeloService";
import {AccionesService} from "../../servicios/AccionesService";
import {Acciones} from "../../modelos/Acciones";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Cliente} from "../../modelos/Cliente";
import {Servicio} from "../../modelos/Servicio";
import {ServicioService} from "../../servicios/ServicioService";
import {Descripcion} from "../../modelos/Descripcion";
import {Modelo} from "../../modelos/Modelo";

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {
  cliente:Cliente=new Cliente();
  vehiculo:Vehiculo=new Vehiculo();
  servicio:Servicio=new Servicio();
  modelo:Modelo=new Modelo();
  detalleservicio:Descripcion=new Descripcion();

  isLinear=true
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup

  listaModelo:Array<any>=[];
  listaAcciones:Array<any>=[];
  listaAcciones1:Array<any>=[];
  // @ts-ignore
  acciones:Acciones[];

  // @ts-ignore
  selectedValue: string;

  displayedColumns: string[] = ['accion'];
  // @ts-ignore
  dataSource: MatTableDataSource<Acciones>;

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // @ts-ignore
  @ViewChild(MatTable) table: MatTable<Acciones>;


  date = new FormControl(new Date());

  constructor(private _formBuilder: FormBuilder,
              private servicioModelo:ModeloService,
              private servicioAcciones:AccionesService,
              private servicioService:ServicioService) {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  hide = true;
  accion:Boolean=true;

  profileFormPaciente = new FormGroup({
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nombre: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    sexo: new FormControl('',Validators.required),
    telefono: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nacimiento: new FormControl('',Validators.required),
    correo: new FormControl('',[Validators.required, Validators.email]),
    contra: new FormControl('',Validators.required),
    sangre: new FormControl('',Validators.required),
    ocupacion: new FormControl('',Validators.required),
    estado: new FormControl('',Validators.required),

  });

  ngOnInit(): void {
    this.servicioModelo.getModelos().subscribe((data:any)=>{
      this.listaModelo=data;
    })
  }

  profileForm = new FormGroup({
    fechaI: new FormControl('',Validators.required),
    fechaF: new FormControl('',Validators.required),
    hora: new FormControl('',Validators.required),
  });

  AccionesSeleccion(id:String){
    while (this.listaAcciones.length>0){
      for (let i=0;i<this.listaAcciones1.length;i++){
        this.table.renderRows();
      }
    }
    this.servicioAcciones.getAcciones().subscribe(data=>{
      this.listaAcciones.pop()
      for(let ac of data){
        if (ac.modelo.id_modelo==id){
          this.listaAcciones.push(ac);
        }
      }
      this.listaAcciones1.pop()
      this.listaAcciones1=this.listaAcciones;
      console.log(this.listaAcciones1.length)
      this.dataSource = new MatTableDataSource(this.listaAcciones1);
      this.dataSource.paginator = this.paginator;
    })
  }

  guardaServcio(){
    this.cliente.estado="Activo";
    this.vehiculo.estado="Activo";
    this.servicio.estado="Activo";
    this.vehiculo.cliente=this.cliente;
    this.servicio.vehiculo=this.vehiculo;
    console.log(this.servicio);
    /*this.servicioService.crearService(this.servicio).subscribe(data=>{
      console.log("Creado")
    })*/
  }

}
