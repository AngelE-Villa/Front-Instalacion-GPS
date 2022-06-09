import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Servicio} from "../../modelos/Servicio";
import {ServicioService} from "../../servicios/ServicioService";
import {ActivatedRoute, Router} from "@angular/router";
import {Descripcion} from "../../modelos/Descripcion";
import {DescripcionService} from "../../servicios/DescripcionService";
import {GpsService} from "../../servicios/GpsService";
import {Gps} from "../../modelos/Gps";
import {AccionesService} from "../../servicios/AccionesService";
import {Modelo} from "../../modelos/Modelo";
import {MatDialog} from "@angular/material/dialog";
import {VehiculoService} from "../../servicios/VehiculoService";
import {Vehiculo} from "../../modelos/Vehiculo";
import {Cliente} from "../../modelos/Cliente";
import {HistorialService} from "../../servicios/HistorialService";
import {Historial} from "../../modelos/Historial";
import {withModule} from "@angular/core/testing";

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {

  servicio:Servicio=new Servicio();
  servicioSet:Servicio=new Servicio();
  gps:Gps=new Gps();
  modelo:Modelo=new Modelo();
  vehiculo:Vehiculo=new Vehiculo();
  vehiculoGet:Vehiculo=new Vehiculo();
  historial:Historial=new Historial();
  vehiculoedit:Vehiculo=new Vehiculo();

  //Historial
  vehiculoHistorial:Vehiculo=new Vehiculo();

  @ViewChild('dialogEditServiciogps')
  dialogEditServiciogps!: TemplateRef<any>;

  @ViewChild('dialogEditServiciovehiculo')
  dialogEditServiciovehiculo!: TemplateRef<any>;

  detalle:Descripcion;
  detalleedi:Descripcion;

  listadetalle=[];
  listadetallehistorial=[];
  listadetallen=[];
  listadetallehistoriaGet=[];

  cliente:Cliente=new Cliente();
  detalleid:Descripcion;

  listvehiuclosCliSinSer=[];

  editarNFechas=false;
  editarNGps=false;

  listaacciones=[];

  titulo:any;
  id:any;

  cantidad:any;

  buscarimei:any;

  editv=false;
  editgps=false;
  allinfo=true;

  vernuvehiculo=false;
  vernuvegps=false;


  constructor(private serviceService:ServicioService,
              private route:ActivatedRoute,
              private serviciodescripcion: DescripcionService,
              private servicioGps:GpsService,
              private servicioAcciones:AccionesService,
              public dialog: MatDialog,
              private serviceVehiculo:VehiculoService,
              private serviceHistorial:HistorialService,
              private router:Router) { }

  ngOnInit(): void {
    this.listaServicio();
  }

  listaServicio(){
    this.id=this.route.snapshot.params['id'];
    if (this.id){
      this.serviciodescripcion.getDescrip().subscribe(data=>{
          this.listadetalle=data.filter(m=>m.documentoservicio.id_documentoservicio==this.id && m.estado=="Activo")
          let conta=0;
          for (let cli of this.listadetalle){
            if (conta==0){
              this.detalle=cli;
              this.cliente=this.detalle.vehiculo.cliente;
              conta++;
              break;
            }
          }
          this.serviceHistorial.getByidCliente(this.cliente.id_persona).subscribe((data1:any)=>{
            this.listadetallehistoriaGet=data1;
          })
        }
      );
    }
    this.serviceService.getService(this.id).subscribe(value => {
      this.servicio=value;
    })
  }

  editarGps(){
   this.servicioSet=this.servicio;
    this.buscarimei=this.detalle.gps.imei_gps;
    this.editarNGps=true;
    this.editarNFechas=false;
    this.modelo=this.detalle.gps.modelo;
    this.servicioAcciones.getAcciones().subscribe(data => {
      this.listaacciones.pop()
      for (let ac of data) {
        if (ac.modelo.id_modelo == this.modelo.id_modelo) {
          this.listaacciones.push(ac);
        }
      }
    })
  }

  editarVehiculo(id_vehiculo:String){
    this.serviceVehiculo.getVehiculo(id_vehiculo).subscribe((data:any)=>{
      this.vehiculo=data;
      let nuevovehiculo = new Descripcion(this.detalleedi.documentoservicio,this.detalleid.estado,this.detalleedi.gps, this.vehiculo,this.detalleedi.observacion, this.detalleedi.ubicacion)
      this.listadetallen.push(nuevovehiculo)
      this.listadetallehistorial.push(this.detalleedi);
      this.vernuvehiculo=true;
      console.log("Nuevo");
      console.log(this.listadetallen);
      console.log("Lista Historial");
      console.log(this.listadetallehistorial);
    })
  }

  buscarximei() {
    this.listaacciones.pop();
    this.servicioGps.getGps().subscribe((value: any) => {
      if (value.filter((data: any) => data.imei_gps == this.buscarimei).length == 0) {
        console.log("No imei")
      } else {
        this.gps = value.find((data: any) => {
          return data.imei_gps == this.buscarimei
        })

        this.modelo=this.gps.modelo;

        this.servicioAcciones.getAcciones().subscribe(data => {
          this.listaacciones.pop()
          for (let ac of data) {
            if (ac.modelo.id_modelo == this.modelo.id_modelo) {
              this.listaacciones.push(ac);
            }
          }
        })
      }
    })
  }

  //Abrir
  abrirdialogoEditServiciogps(iddetalle:any){
    this.titulo="Editar GPS"
    this.serviciodescripcion.getByidDescrip(iddetalle).subscribe((data1:any)=>{
      this.detalleid=data1;
      console.log(this.listadetalle)
      this.dialog.open(this.dialogEditServiciogps);
    })
  }

  edithtmlvehiculo(iddetalle:any){
    this.titulo="Editar Vehiculo"
    this.serviciodescripcion.getByidDescrip(iddetalle).subscribe(data=>{
      this.detalleid=data;
      this.editv=true;
      this.allinfo=false
    })
  }

  edithtmlgps(iddetalle:any){
    this.titulo="Editar GPS"
    this.serviciodescripcion.getByidDescrip(iddetalle).subscribe((data1:any)=>{
      this.detalleid=data1;
      this.editgps=true;
      this.allinfo=false
    })
  }

  abrirdialogoEditServiciovehiculo(idcli:any, det:Descripcion){
    this.detalleedi=det;
    this.titulo="Seleccione el vehiculo";
      this.serviceVehiculo.getVehiculoCli(idcli).subscribe(data=>{
        this.listvehiuclosCliSinSer=data.filter(m=>m.estado=="Activo")
        this.dialog.open(this.dialogEditServiciovehiculo);
      })

  }

  cancelarnvehiculo() {
      this.editv=false;
      this.allinfo=true;
      this.listadetallen.pop();
      this.listadetallehistorial.pop();
      this.vernuvehiculo=false;
  }

  guardarcambiosVehiculo(idde:String){
    this.vehiculoedit=this.detalleid.vehiculo;
    this.vehiculoedit.estado="Activo";
      this.serviceVehiculo.editarVehiculos(this.vehiculoedit,this.vehiculoedit.id_vehiculo).subscribe(l=>{
        for (let nvg of this.listadetallen){
          nvg.estado="Activo"
          nvg.fecha_inst=new Date();
          this.serviciodescripcion.crearDescrip(nvg).subscribe(d=>{
            this.vehiculoGet=nvg.vehiculo;
            this.vehiculoGet.estado="En servicio"
            this.serviceVehiculo.editarVehiculos(this.vehiculoGet,this.vehiculoGet.id_vehiculo).subscribe(m=> {
              for (let dh of this.listadetallehistorial){
                this.historial.documentodescripcion=dh;
                this.historial.nombre="Vehiculo";
                this.historial.fecha_cam=new Date();
                this.serviceHistorial.crearHistorial(this.historial).subscribe(h=>{
                  dh.estado="Cambiado"
                  this.serviciodescripcion.editarDescrip(dh,idde).subscribe(dated=>{
                    window.location.reload();
                  })

                })
              }

            })
          });
        }
      })
  }

}
