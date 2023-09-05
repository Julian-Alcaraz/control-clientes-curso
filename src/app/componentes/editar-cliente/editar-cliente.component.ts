import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  id:string;
  constructor(private clienteServices:ClienteService,
    private router:Router,
    private route: ActivatedRoute,
    private fb:FormBuilder
    ){}
    clientes:Cliente[];
    form:FormGroup;
    cliente: Cliente={
      nombre:'',
      apellido:'',
      email:'',
      saldo:0
    } 
    ngOnInit(): void {
        this.initForm()
        this.id = this.route.snapshot.params['id'];
        console.log(this.id);
        this. clienteServices.getCliente(this.id).subscribe(cliente=>{
          this.cliente = cliente;
          this.form.setValue({
            'nombre':this.cliente.nombre,
            'apellido':this.cliente.apellido,
            'mail':this.cliente.email,
            'saldo':this.cliente.saldo
          })  
        });

    }
    // formulario 
    initForm(){
      this.form= this.fb.group({
        nombre:['' ,Validators.compose([Validators.required,Validators.minLength(2)])],
        apellido:['' ,Validators.compose([Validators.required,Validators.minLength(2)]) ],
        mail:['' ,Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
        saldo:['' ,Validators.compose([Validators.required])],
      })
    }
    get nombreInvalid(){
      return this.form.controls['nombre'].invalid && this.form.controls['nombre'].touched;
    }
    get apellidoInvalid(){
      return this.form.controls['apellido'].invalid && this.form.controls['apellido'].touched;
    }
    get mailInvalid(){
      return this.form.controls['mail'].invalid && this.form.controls['mail'].touched;
    }
    get saldoInvalid(){
      return this.form.controls['saldo'].invalid && this.form.controls['saldo'].touched;
    }
    modificar(){
      Swal.fire({
      icon: 'success',
      title: 'good',
      text: ' Carga exitosa!',
      });
      // consultar al torre que tan bien esta esta asignacion al objeto
      // let cliente: Cliente;
      // cliente=this.form.value // tengo que cambiar el nomrbre del objeto de email a mail par que lo tome
      //forma dos
      this.cliente.nombre = this.form.value['nombre'];
      this.cliente.apellido = this.form.value['apellido'];
      this.cliente.email = this.form.value['mail'];
      this.cliente.saldo = this.form.value['saldo'];
      this.clienteServices.modificarCliente(this.cliente);
      this.router.navigate(['/']);
    }
    eliminar(){
      if(confirm("Seguro que desea eliminar el cliente?")){
        this.clienteServices.eliminarCliente(this.cliente);
        Swal.fire({
          icon: 'warning',
          title: 'Complet',
          text: ' Se elimino correctamente!',
          });
        this.router.navigate(['/']);

      }
     
    }
  }
