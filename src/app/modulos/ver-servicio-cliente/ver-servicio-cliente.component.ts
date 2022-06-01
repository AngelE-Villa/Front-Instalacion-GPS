import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Servicio} from "../../modelos/Servicio";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ServicioService} from "../../servicios/ServicioService";
import {ActivatedRoute, Route} from "@angular/router";
import {Cliente} from "../../modelos/Cliente";
import {MatDialog} from "@angular/material/dialog";
import {DescripcionService} from "../../servicios/DescripcionService";
import {AccionesService} from "../../servicios/AccionesService";
import {Descripcion} from "../../modelos/Descripcion";
import {Acciones} from "../../modelos/Acciones";
import {Pagos} from "../../modelos/Pagos";
import {PagosService} from "../../servicios/PagosService";
import {PlanService} from "../../servicios/PlanService";
import {Plan} from "../../modelos/Plan";
import {$0} from "@angular/compiler/src/chars";
import {withModule} from "@angular/core/testing";

@Component({
  selector: 'app-ver-servicio-cliente',
  templateUrl: './ver-servicio-cliente.component.html',
  styleUrls: ['./ver-servicio-cliente.component.css']
})
export class VerServicioClienteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fechas','hora', 'fechaI','fechaF','estadoSer','activar','detalles','editar','eliminar'];
  // @ts-ignore
  dataSource: MatTableDataSource<Servicio>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  title = 'angular-material-dialog-app';

  monto:any;

  @ViewChild('dialogRef')
  dialogRef!: TemplateRef<any>;

  @ViewChild('dialogRefActivacion')
  dialogRefActivacion!: TemplateRef<any>;

  datos: Servicio[] = [];
  infodetalle: Descripcion[]= [];
  listadetalle:[];
  id:any;
  cliente:Cliente=new Cliente();
  servicio:Servicio=new Servicio();
  servicioGet:Servicio=new Servicio();
  detalle:Descripcion;
  pago:Pagos=new Pagos();
  pagoGet:Pagos=new Pagos();
  plan:Plan=new Plan();

  constructor(private serviceService:ServicioService,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              private detalleService:DescripcionService,
              private acciones:AccionesService,
              private pagoService:PagosService,
              private servicePlan:PlanService) {

  }
  ngOnInit(): void {
    this.listaServicios();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listaServicios(){
    this.id=this.route.snapshot.params['id'];
    if (this.id){
      this.detalleService.getDescrip().subscribe((data:any)=>{
        this.detalle=data.find((m)=>{return m.vehiculo.cliente.id_persona==this.id} );

        this.serviceService.getServices().subscribe((data1:any)=>{
          this.datos=data1.filter((m)=> m.id_documentoservicio==this.detalle.documentoservicio.id_documentoservicio);
          console.log(data1)
          this.servicio=this.datos.find((m)=>{return m.id_documentoservicio==this.detalle.documentoservicio.id_documentoservicio})
          this.cliente.nombre=this.detalle.vehiculo.cliente.nombre;
          this.dataSource = new MatTableDataSource(this.datos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      })
    }else {
      console.log("Crear")
    }
  }

  openTempDialog(id:String) {
    this.detalleService.getDescrip().subscribe((value1:any)=>{
      this.infodetalle=value1.filter((m)=> m.documentoservicio.id_documentoservicio==id);
    })
    this.dialog.open(this.dialogRef);
  }

  openTempDialogPagos(id:String) {
    this.servicio.costo=0;
    this.pago.cantidad_p=0;
    this.serviceService.getService(id).subscribe((value1:any)=>{
      this.servicioGet=value1;
      console.log(this.servicioGet.idplan)
      this.servicePlan.getPlan(this.servicioGet.idplan).subscribe((value:any)=>{
        this.plan=value;
        this.monto=this.plan.costo_p-this.servicioGet.costo;
      })
    })
    this.dialog.open(this.dialogRefActivacion);
  }


  activarservicio(){
    let cant= this.pago.cantidad_p/4;
    let mesmili = ((1000 * 60 * 60 * 24 * 7 * 4)+((1000*60*60*24)*2)) *cant;
    if(this.servicio.fecha_fin!=null){
      console.log("Hay fecha fin")
      var date=new Date(this.servicio.fecha_fin);
    }else{
      var date=new Date(this.servicio.fecha_ds);
      console.log("No Hay fecha fin")
    }
    this.servicio.fecha_fin = new Date(date.getTime()+mesmili);

    this.servicio.estado="Activo"
    this.serviceService.getService(this.servicio.id_documentoservicio).subscribe((data:any)=>{
      this.servicioGet=data;
      this.servicio.costo=Number(this.servicioGet.costo)+Number(this.servicio.costo);

      console.log(this.servicio)

      this.serviceService.editarService(this.servicio,this.servicio.id_documentoservicio).subscribe((data:any)=>{
        console.log("Actializado el servicio")
        this.pago.docservice=this.servicio;
        this.pago.fecha_pago=new Date();
        console.log(this.pago)
        this.pagoService.crearPagos(this.pago).subscribe((value:any)=>{
          console.log("Pago realizado")
          window.location.reload();
        })
      })
    })
  }
}

