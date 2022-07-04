import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanService} from "../../servicios/PlanService";
import {Plan} from "../../modelos/Plan";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {

  //ubis obs
  ubica:any;
  obser:any;

//Boolean
  infocli = false;
  buscarclienteB = true;

  buscarcliente?: String;

  cliente: Cliente = new Cliente();
  vehiculo: Vehiculo = new Vehiculo();
  servicio: Servicio = new Servicio();
  modelo: Modelo = new Modelo();
  detalle:Descripcion;
  gps: Gps = new Gps();

  listagps=[];

  listavehiculos = [];
  listavehiculosAsignados = [];
  listaDetalle:Array<Descripcion>=[];
  accionespdf:Acciones[] = [];

  //Datos Get
  clienteGet: Cliente = new Cliente();
  listaClienteGet: Array<any> = [];

  vehiculoGet: Vehiculo = new Vehiculo();

  servicioGet: Servicio = new Servicio();

  gpsGet: Gps = new Gps();

  modeloGet: Modelo = new Modelo();

  isLinear = true

  id_plan:any;

  plan:Plan=new Plan();

  listaModelo: Array<any> = [];
  listaAcciones = [];
  // @ts-ignore
  acciones: Acciones[];

  // @ts-ignore
  selectedValue: string;

  displayedColumns: string[] = ['accion'];
  // @ts-ignore
  dataSource: MatTableDataSource<Acciones>;

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // @ts-ignore
  @ViewChild(MatTable) table: MatTable<Acciones>;


  date = new FormControl(new Date());

  constructor(private _formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private servicioModelo: ModeloService,
              private servicioAcciones: AccionesService,
              private servicioService: ServicioService,
              private servicioCliente: ClienteService,
              private servicioVehiculo: VehiculoService,
              private servicioDescripcion: DescripcionService,
              private servicioPlan:PlanService,
              private servicioGps: GpsService,
              public dialog: MatDialog,
              private router:Router,
              private route:ActivatedRoute) {

  }

  firstFormGroup = new FormGroup({
    cedcli: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
  });

  hide = true;
  accion: Boolean = true;

  ngOnInit(): void {
    this.id_plan=this.route.snapshot.params['id'];
    let date: Date = new Date();
    this.servicio.fecha_ds=date;
    this.servicio.fecha_inicion=date;
    this.servicio.hora=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    this.servicioModelo.getModelos().subscribe((data: any) => {
      this.listaModelo = data;
    })
    this.listaAcciones.pop();
    this.servicioGps.getGps().subscribe((value: any) => {
      this.listagps = value.filter(m=>m.estado=="Activo");
    })

    this.planbyid();
  }

  planbyid(){
    this.servicioPlan.getPlan(this.id_plan).subscribe((x:any)=>{
        this.plan=x;
    })
  }


  profileForm = new FormGroup({
    fechaI: new FormControl('', Validators.required),
    fechaF: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
  });

  //1.0
  buscarCliente($event :any) {
    this.cliente=new Cliente();
    if($event.target.value.length==10){
      this.servicioCliente.getClientCedula($event.target.value).subscribe(value => {
        if(value==null){
          this.snackBar.open("El cliente no existe", "",{
            duration: 1 * 1000,
          });
        }else{
          this.cliente=value;
          this.vehiculosporCliente(this.cliente.cedula);
        }
      })
    }
  }
  //1.0
  flitrarimei($event :any) {
    this.listaAcciones.pop()
    this.gps=new Gps();
    console.log(this.listagps)
    if (this.listagps.length>0){
      for (let m of this.listagps){
        if(m.imei_gps==$event.target.value){
          this.gps=m;
        }
      }
      this.modelo=this.gps.modelo;
      this.servicioAcciones.getAcciones().subscribe(data => {
        this.listaAcciones.pop()
        for (let ac of data) {
          if (ac.modelo.id_modelo == this.modelo.id_modelo) {
            this.listaAcciones.push(ac);
          }
        }
      })
    }
  }

  //1.0
  addImei(id_vehiculo:any){
    this.servicioVehiculo.getVehiculo(id_vehiculo).subscribe((data:any)=>{
      this.vehiculo=data;
    })
    this.gps=new Gps();
    this.ubica="";
    this.obser="";
    while (this.listaAcciones.length>0){
      this.listaAcciones.pop();
    }
    if (this.listaAcciones.length<1) {
      this.dialog.open(this.dialogRef);
    }
  }

  //1.0
  Agregarlista(){
      console.log(this.servicio)
      console.log(this.vehiculo)
      this.dialog.closeAll();
        var narray=this.listavehiculos.filter((item) => item.id_vehiculo !== this.vehiculo.id_vehiculo);
        this.listavehiculos=narray
        this.listavehiculosAsignados.push(new Descripcion(this.servicio,"Activo",
                                                          this.gps,
                                                          this.vehiculo,
                                                          this.obser,
                                                          this.ubica));
        console.log(this.listavehiculosAsignados)
  }

  //1.0
  Quitar(id_vehiculo:any){
    this.servicioVehiculo.getVehiculo(id_vehiculo).subscribe((data:any)=>{
      this.vehiculo=data;
      var narray=this.listavehiculosAsignados.filter((item) => item.vehiculo.id_vehiculo !== id_vehiculo);
      this.listavehiculosAsignados=narray
      this.listavehiculos.push(this.vehiculo)
    })
  }

  vehiculosporCliente(cedula:String){
    console.log(this.cliente)
    this.servicioVehiculo.getVehiculos().subscribe((value:any)=>{
      this.listavehiculos=value.filter((data:any)=>data.cliente.cedula==cedula && data.estado=="Activo")
    })
  }


  guardaServicio(){
    this.servicio.estado="Desactivado";
    this.servicio.costo_plan=this.plan.p_costo_mensual;
    this.servicio.tipo_plan=this.plan.descripcion_plan;
    var e = new Date()
    let mesmili = ((1000 * 60 * 60 * 24 * 7 * 4)+((1000*60*60*24)*2))*this.plan.num_descripcion_p;
    console.log(new Date(e.getTime()+mesmili))

    this.servicio.fecha_fin_plan=new Date(e.getTime()+mesmili)
    console.log(this.servicio.fecha_fin_plan)
    let cont=0;
    this.servicio.idplan=this.id_plan;
      this.servicioService.crearService(this.servicio).subscribe((data:any)=>{
       this.servicioGet=data;
        for (let des of this.listavehiculosAsignados){
          this.vehiculoGet=des.vehiculo;
          this.gpsGet=des.gps;
          this.detalle=new Descripcion(this.servicioGet,des.estado,this.gpsGet,this.vehiculoGet,des.observacion,des.ubicacion)
          console.log(this.detalle)
          this.detalle.fecha_inst=new Date();
          this.vehiculoGet.estado="En servicio";
          this.gpsGet.estado="En servicio";
          this.servicioVehiculo.editarVehiculos(this.vehiculoGet,this.vehiculoGet.id_vehiculo).subscribe(m=>{
            console.log("gps "+cont)
          })
          this.servicioGps.editGps(this.gpsGet,this.gpsGet.id_gps).subscribe(n=>{
            console.log("vehiculo "+cont)
          })
          this.servicioDescripcion.crearDescrip(this.detalle).subscribe((d:any)=>{
            console.log(d)
                    cont++;
                  if(cont==this.listavehiculosAsignados.length){
                    this.snackBar.open("SERVICIO CREADO", "",{
                      duration: 1 * 1000,
                    });
                    this.router.navigate(['/verservicios'])
                  }
            })
          }
     })
  }




  newArray =  [];
  recorreArray(){
    this.accionespdf = this.listaAcciones.filter(m => m);
    this.accionespdf.map((ac) =>
      this.newArray.push([
         ac.nombre,
      ])
    )
    return this.newArray;
  }

  createPdf() {
    console.log(this.recorreArray())
    console.log(this.newArray)
    var fecha: String = new Date().toISOString();
    var pipe: DatePipe = new DatePipe('en-US')

    const pdfDefinition: any = {
      content: [

        {
          text: '_________________________________________________________________________________________',
          alignment: 'center'
        },


        {text: 'COORDENADA', fontSize: 15, bold: true, alignment: 'center'},
        {text: '    '},
        {text: 'INFORMACION GENERAL', fontSize: 13, bold: true, alignment: 'center'},
        {text: '    '},
        {
          fontSize: 13,
          table: {
            widths: ['50%', '50%'],
            body: [
              ['PLACA: ' + this.vehiculo.placa, 'CLAVE: ' + this.vehiculo.clave],
              ['NOMBRE:' + this.cliente.nombre, 'RUC/CLI:' + this.cliente.cedula],
              ['DIRECCION: ' + this.cliente.direccion, 'CORREO: ' + this.cliente.correo],
              ['VEHICULO:' + this.vehiculo.vehiculo, 'TELEFONO: ' + this.cliente.telefono],
              ['ANIO:' + this.vehiculo.anio, 'IMEI GPS: ' + this.gpsGet.imei_gps],
              ['NUMERO DE GPS: ' + this.gpsGet.num_gps, 'KILOMETRAJE: ' + this.vehiculo.kilometraje],
              ['NUMERO SIM: ' + this.gpsGet.num_sim, 'FECHA ENTREGA: ' + pipe.transform(this.servicio.fecha_ds, 'dd/MM/yyyy')],
              ['FECHA INICIO: ' + pipe.transform(this.servicio.fecha_inicion, 'dd/MM/yyyy'), 'FECHA FIN: ' + pipe.transform(this.servicio.fecha_fin, 'dd/MM/yyyy')],
              ['ATENDIDO POR: Angel Villa', 'HORAS: ' + this.servicio.hora],
              [' MODELO ' + this.modeloGet.nombre, ' ']

            ]
          }
        },
        {text: '    '},
        {text: 'SERVICIO', fontSize: 13, bold: true, alignment: 'center'},
        {
          fontSize: 13,
          table: {
            widths: ['100%'],
            body: [

              ['DESCRIPCION: '],
                    [
                      {
                        stack: [
                          {
                            ol: [this.newArray],
                          },

                       ],
                    },
                ],
            ]
          }
        },
        {text: '    '},
        {
          fontSize: 13,
          table: {
            widths: ['100%'],
            body: [
              ['OBSERVACIONES: '],
            ]
          }
        },

        {text: '    '},
        {text: 'UBICACION GPS', fontSize: 13, bold: true, alignment: 'center'},
        {text: '    '},
        {
          fontSize: 13,
          table: {
            widths: ['50%', '50%'],
            body: [
              [''],

            ]
          }
        }

      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }

}
