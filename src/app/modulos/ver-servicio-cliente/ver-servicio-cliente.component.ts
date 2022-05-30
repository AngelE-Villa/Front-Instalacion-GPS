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

  constructor(private serviceService:ServicioService,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              private detalleService:DescripcionService,
              private acciones:AccionesService,
              private pagoService:PagosService) {

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
    this.serviceService.getService(id).subscribe((value1:any)=>{
      this.servicioGet=value1;
    })
    this.dialog.open(this.dialogRefActivacion);
  }

  guardarCambios(id:String){
    let cont=0;
    this.detalleService.getDescrip().subscribe((data:any)=>{
      this.listadetalle=data;
      cont=this.listadetalle.length;
      console.log(cont)
    })
  }
}

