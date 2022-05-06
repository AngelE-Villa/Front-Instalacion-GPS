import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import {RouterModule, Routes} from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material/material.module";
import { CuerpoComponent } from './modulos/cuerpo/cuerpo.component';
import { InicioSesionComponent } from './modulos/inicio-sesion/inicio-sesion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegistroUsuariosComponent } from './modulos/registro-usuarios/registro-usuarios.component';
import { VerServiciosComponent } from './modulos/ver-servicios/ver-servicios.component';
import { VerClientesComponent } from './modulos/ver-clientes/ver-clientes.component';
import { VerVehiculosComponent } from './modulos/ver-vehiculos/ver-vehiculos.component';
import { VerGpsComponent } from './modulos/ver-gps/ver-gps.component';
import { NuevoModeloGpsComponent } from './modulos/nuevo-modelo-gps/nuevo-modelo-gps.component';

const routes: Routes = [
  {path:'', component:CuerpoComponent},
  {path:'iniciasesion', component:InicioSesionComponent},
  {path:'registrousuario', component:RegistroUsuariosComponent},
  {path:'verservicios', component:VerServiciosComponent},
  {path:'verclientes', component:VerClientesComponent},
  {path:'vervehiculos', component:VerVehiculosComponent},
  {path:'vergps', component:VerGpsComponent},
  {path:'nuevomodelogps', component:NuevoModeloGpsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CuerpoComponent,
    InicioSesionComponent,
    RegistroUsuariosComponent,
    VerServiciosComponent,
    VerClientesComponent,
    VerVehiculosComponent,
    VerGpsComponent,
    NuevoModeloGpsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
