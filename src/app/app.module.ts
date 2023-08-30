import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../evironments/enviroments';
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirestore, getFirestore} from '@angular/fire/firestore/';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { FlashMessagesModule } from 'node_modules/flash-messages-angular'; 
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { ClienteService } from './servicios/cliente.service';

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
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firestore),
    // provideFirebaseApp(()=>initializeApp(environment.firestore)), esta es la forma nueva, cambia la forma de traerlo tmb
    provideFirestore(()=>getFirestore()),
    provideAuth(()=>getAuth()),
    // FlashMessagesModule.forRoot(), esto me explota la app nose porq
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
