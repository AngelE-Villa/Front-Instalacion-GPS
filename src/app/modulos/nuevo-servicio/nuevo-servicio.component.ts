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
import {MatSelectionListChange} from "@angular/material/list";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
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

  infovehiculo=false;
  seleccionvehiculo=true;

  //busqueda
  buscarimei?: String;
  buscarcliente?: String;

  cliente: Cliente = new Cliente();
  vehiculo: Vehiculo = new Vehiculo();
  servicio: Servicio = new Servicio();
  modelo: Modelo = new Modelo();
  detalle:Descripcion;
  gps: Gps = new Gps();


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
              private servicioGps: GpsService,
              public dialog: MatDialog,
              private router:Router) {

  }

  firstFormGroup = new FormGroup({
    cedcli: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
  });

  hide = true;
  accion: Boolean = true;

  ngOnInit(): void {

    let date: Date = new Date();
    this.servicio.fecha_ds=date;
    this.servicio.hora=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    this.servicioModelo.getModelos().subscribe((data: any) => {
      this.listaModelo = data;
    })
  }

  //1.0 Cambio
  cambioCliente(){
    this.infocli = false;
    this.buscarclienteB = true;
  }

  profileForm = new FormGroup({
    fechaI: new FormControl('', Validators.required),
    fechaF: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
  });

  //1.0
  buscarCliente() {
    this.servicioCliente.getClient().subscribe((value: any) => {
      if (value.filter((data: any) => data.cedula == this.buscarcliente).length == 0) {
        this.snackBar.open("El cliente no existe", "",{
          duration: 1 * 1000,
        });
      } else {
        this.infocli = true;
        this.buscarclienteB = false;
        this.cliente = value.find((m: any) => {
          return m.cedula == this.buscarcliente
        });
        this.vehiculosporCliente(this.cliente.cedula);
      }
      console.log(this.cliente)
    })
  }
  //1.0
  buscarximei() {
    this.listaAcciones.pop();
    this.servicioGps.getGps().subscribe((value: any) => {
      if (value.filter((data: any) => data.imei_gps == this.buscarimei).length == 0) {
        console.log("No imei")
      } else {
        this.listaAcciones.pop();
        this.gps = value.find((data: any) => {
          return data.imei_gps == this.buscarimei
        })

        this.servicioAcciones.getAcciones().subscribe(data => {
          this.listaAcciones.pop();
          for (let ac of data) {
            if (ac.modelo.id_modelo == this.gps.modelo.id_modelo) {
              this.listaAcciones.push(ac);
            }
          }
        })
      }
    })
  }

  //1.0
  addImei(id_vehiculo:any){
    this.servicioVehiculo.getVehiculo(id_vehiculo).subscribe((data:any)=>{
      this.vehiculo=data;
    })
    this.dialog.open(this.dialogRef);
  }

  //1.0
  Agregarlista(id_gps:any){
      console.log(this.servicio)
      console.log(this.vehiculo)
      this.dialog.closeAll();
      this.servicioGps.getgps(id_gps).subscribe((value:any)=>{
        this.gps=value;

        var narray=this.listavehiculos.filter((item) => item.id_vehiculo !== this.vehiculo.id_vehiculo);
        this.listavehiculos=narray
        this.listavehiculosAsignados.push(new Descripcion(this.servicio,"Activo",
                                                          this.gps,
                                                          this.vehiculo,
                                                          this.obser,
                                                          this.ubica));
        console.log(this.listavehiculosAsignados)
      });
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
      this.listavehiculos=value.filter((data:any)=>data.cliente.cedula==cedula)
    })
  }


  guardaServicio(){
    this.servicio.estado="Activo";
    console.log(this.servicio)
      this.servicioService.crearService(this.servicio).subscribe((data:any)=>{
        this.servicioGet=data;
        for (let des of this.listavehiculosAsignados){
          this.detalle=new Descripcion(this.servicioGet,des.estado,des.gps,des.vehiculo,des.observacion,des.ubicacion)
          console.log(des.vehiculo)
          console.log(this.detalle)
          console.log(this.detalle.vehiculo)
          this.servicioDescripcion.crearDescrip(this.detalle).subscribe((data:any)=>{
            this.snackBar.open("SERVICIO CREADO", "",{
              duration: 1 * 1000,
            });
            this.router.navigate(['/verservicios'])
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
