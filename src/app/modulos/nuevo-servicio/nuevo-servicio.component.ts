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
import {ClienteService} from "../../servicios/ClienteService";
import {VehiculoService} from "../../servicios/VehiculoService";
import {DescripcionService} from "../../servicios/DescripcionService";
import {Gps} from "../../modelos/Gps";
import {GpsService} from "../../servicios/GpsService";

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
  detalle:Descripcion=new Descripcion();
  gps:Gps=new Gps();


  //Datos Get
  clienteGet:Cliente=new Cliente();
  listaClienteGet:Array<any>=[];

  vehiculoGet:Vehiculo=new Vehiculo();

  servicioGet:Servicio=new Servicio();

  gpsGet:Gps=new Gps();

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
              private servicioService:ServicioService,
              private servicioCliente:ClienteService,
              private servicioVehiculo:VehiculoService,
              private servicioDescripcion:DescripcionService,
              private servicioGps:GpsService) {

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

  GuardarCliente(){
    this.servicioCliente.getClient().subscribe((value:any)=>{
      if (value.filter((data:any)=>data.cedula==this.cliente.cedula).length==0){
        console.log("No Entra");
        console.log(this.cliente)
        /*this.servicioCliente.crearClient(this.cliente).subscribe((value:any)=>{
          this.clienteGet=value;
          console.log(this.clienteGet)
        })*/
      }else{
        console.log("Entra");
        this.clienteGet=value.find((m:any)=>{return m.cedula==this.cliente.cedula});
        console.log(this.clienteGet.nombre)
      }
    })

  }

  GuardarVehiculo(){
    this.servicioVehiculo.getVehiculos().subscribe((value:any)=>{
      if (value.filter((data:any)=>data.placa==this.vehiculo.placa).length==0){
        console.log("No Entra");
        this.vehiculo.cliente=this.clienteGet.id_persona;
        this.vehiculo.estado="Activo"
        console.log(this.vehiculo)
        /*this.servicioVehiculo.crearVehiculos(this.vehiculo).subscribe((value:any)=>{
          this.vehiucloGet=value
          console.log(this.vehiucloGet)
        })*/
      }else{
        console.log("Entra");
        this.vehiculoGet=value.find((m:any)=>{return m.placa==this.vehiculo.placa});
        console.log(this.vehiculoGet)
      }
    })
  }



  guardaServcio(){
    this.cliente.estado="Activo";
    this.vehiculo.estado="Activo";
    this.servicio.estado="Activo";
    this.vehiculo.cliente=this.clienteGet.id_persona;
    this.servicio.vehiculo=this.vehiculoGet;
    console.log(this.servicio);

    //DatoS gps
    this.servicioGps.getGps().subscribe((value:any) => {
      this.gpsGet=value.find((m:any)=>{return m.modelo.id_modelo==this.modelo.id_modelo});
      console.log(this.gpsGet)
    })


    /*this.servicioService.crearService(this.servicio).subscribe((data:any)=>{
      this.servicioGet=data;
      this.detalle.documentoservicio=this.servicioGet.id_documentoservicio;
      this.detalle.estado="Activo"
      this.servicioDescripcion.crearDescrip(this.detalle).subscribe(data=>{
        console.log("Creado")
      })
    })*/
  }

}
