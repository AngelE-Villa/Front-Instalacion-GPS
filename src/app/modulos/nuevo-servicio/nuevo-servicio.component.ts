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
import {MatSelectionListChange} from "@angular/material/list";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from "@angular/common";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {
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
  detalle: Descripcion = new Descripcion();
  gps: Gps = new Gps();


  vehiculos: Vehiculo[] = [];
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
  listaAcciones: Array<any> = [];
  listaAcciones1: Array<any> = [];
  // @ts-ignore
  acciones: Acciones[];

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
              private servicioModelo: ModeloService,
              private servicioAcciones: AccionesService,
              private servicioService: ServicioService,
              private servicioCliente: ClienteService,
              private servicioVehiculo: VehiculoService,
              private servicioDescripcion: DescripcionService,
              private servicioGps: GpsService) {

  }

  firstFormGroup = new FormGroup({
    cedcli: new FormControl('', Validators.required),
    cedula: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('',[Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]+")]),
    correo: new FormControl('',[Validators.required, Validators.email]),
  });

  hide = true;
  accion: Boolean = true;

  ngOnInit(): void {
    let date: Date = new Date();
    this.servicio.fecha_ds=date;
    this.servicioModelo.getModelos().subscribe((data: any) => {
      this.listaModelo = data;
    })
  }

  profileForm = new FormGroup({
    fechaI: new FormControl('', Validators.required),
    fechaF: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
  });

  buscarCliente() {
    this.servicioCliente.getClient().subscribe((value: any) => {
      if (value.filter((data: any) => data.cedula == this.buscarcliente).length == 0) {
        this.infocli = true;
        this.buscarclienteB = false;
      } else {
        this.infocli = true;
        this.buscarclienteB = false;
        this.cliente = value.find((m: any) => {
          return m.cedula == this.buscarcliente
        });
      }
    })
    console.log(this.cliente)
  }

  buscarximei() {
    console.log(this.buscarimei)
    this.servicioGps.getGps().subscribe((value: any) => {
      if (value.filter((data: any) => data.imei_gps == this.buscarimei).length == 0) {
        console.log("No imei")
      } else {
        this.gpsGet = value.find((data: any) => {
          return data.imei_gps == this.buscarimei
        })
        this.modeloGet = this.gpsGet.modelo;

        while (this.listaAcciones.length > 0) {
          for (let i = 0; i < this.listaAcciones1.length; i++) {
            this.table.renderRows();
          }
        }
        this.servicioAcciones.getAcciones().subscribe(data => {
          this.listaAcciones.pop()
          for (let ac of data) {
            if (ac.modelo.id_modelo == this.modeloGet.id_modelo) {
              this.listaAcciones.push(ac);
            }
          }
          this.listaAcciones1.pop()
          this.listaAcciones1 = this.listaAcciones;
          console.log(this.listaAcciones1.length)
          this.dataSource = new MatTableDataSource(this.listaAcciones1);
          this.dataSource.paginator = this.paginator;
        })
      }
    })
  }

  mostardatos() {
    console.log(this.servicio)
  }


  vehiculosporCliente(){
    console.log(this.cliente)
    this.servicioVehiculo.getVehiculos().subscribe((value:any)=>{
      this.vehiculos=value.filter((data:any)=>data.cliente.cedula==this.cliente.cedula)
      console.log(this.vehiculos)
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
          this.vehiculoGet=value
          console.log(this.vehiculoGet)
        })*/
      }else{
        console.log("Entra");
        this.vehiculoGet=value.find((m:any)=>{return m.placa==this.vehiculo.placa});
        console.log(this.vehiculoGet)
      }
    })
  }



  guardaServicio(){

    this.cliente.estado="Activo";
    this.vehiculo.estado="Activo";
    this.servicio.estado="Activo";
    this.vehiculo.cliente=this.clienteGet;
    this.servicio.vehiculo=this.vehiculoGet.id_vehiculo;

    //fecha de solicitud

    console.log(this.servicio);


    //DatoS gps
    /*this.servicioGps.getGps().subscribe((value:any) => {
      this.gpsGet=value.find((m:any)=>{return m.modelo.id_modelo==this.modelo.id_modelo});
      console.log(this.gpsGet)
    })*/

    this.detalle.gps=this.gpsGet
    /*this.servicioService.crearService(this.servicio).subscribe((data:any)=>{
      this.servicioGet=data;
      this.detalle.documentoservicio=this.servicioGet;
      this.detalle.estado="Activo"
      this.servicioDescripcion.crearDescrip(this.detalle).subscribe(data=>{
        console.log("Creado")
      })
    })*/
  }

  selectVehiculo(vehiculoselect: MatSelectionListChange){
    this.vehiculo=vehiculoselect.option.value;
    this.infovehiculo=true;
    this.seleccionvehiculo=false;
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
              ['OBSERVACIONES: '+this.servicio.observaciones],
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
              [this.servicio.ubicacion_gps],

            ]
          }
        }

      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }

}
