import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent  {}

// export class ClientesComponent implements OnInit {
//   clientes:Cliente[];
//   constructor(private clienteServicio: ClienteService){
//   }
//   ngOnInit(){
//     this.clienteServicio.getClientes().subscribe(
//       clientes=>{
//         this.clientes = clientes}
//     )
//   }
// }