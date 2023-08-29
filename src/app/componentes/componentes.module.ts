import { NgModule } from '@angular/core';
import { AppComponent } from "../app.component";
import { CabeceroComponent } from "./cabecero/cabecero.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { ConfiguracionComponent } from "./configuracion/configuracion.component";
import { EditarClienteComponent } from "./editar-cliente/editar-cliente.component";
import { LoginComponent } from "./login/login.component";
import { NoEncontradoComponent } from "./no-encontrado/no-encontrado.component";
import { PiePaginaComponent } from "./pie-pagina/pie-pagina.component";
import { RegistroComponent } from "./registro/registro.component";
import { TableroComponent } from "./tablero/tablero.component";

@NgModule({
    declarations: [
      AppComponent,
      CabeceroComponent,
      TableroComponent,
      ClientesComponent,
      EditarClienteComponent,
      LoginComponent,
      RegistroComponent,
      ConfiguracionComponent,
      NoEncontradoComponent,
      PiePaginaComponent
    ],
}
)
// Este lo cree recien en base a lo que hablamos nose si va
export class ComponentesModule{}