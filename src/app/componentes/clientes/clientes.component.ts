import {  EmptyExpr } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
  clientes:Cliente[];
  // formulario
  form:FormGroup;
  cliente: Cliente={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }
  @ViewChild("botonCerrar") botonCerrar: ElementRef;
  constructor(private clienteServicio: ClienteService,
    private fb:FormBuilder){
  }

  ngOnInit(){
    this.clienteServicio.getClientes().subscribe(
      clientes=>{
        this.clientes = clientes}
    )
    this.initForm()
  }

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
  save(){
    Swal.fire({
      icon: 'success',
      title: 'good',
      text: ' Carga exitosa!',
    })
    // consultar al torre que tan bien esta esta asignacion al objeto
    // let cliente: Cliente;
    // cliente=this.form.value // tengo que cambiar el nomrbre del objeto de email a mail par que lo tome
    //forma dos
    this.cliente.nombre = this.form.value['nombre'];
    this.cliente.apellido = this.form.value['apellido'];
    this.cliente.email = this.form.value['mail'];
    this.cliente.saldo = this.form.value['saldo'];
    
  //  console.log(this.cliente.nombre)
  //  console.log(this.cliente.apellido)
  //  console.log(this.cliente.email)
  //  console.log(this.cliente.saldo)
    this.clienteServicio.cargarCliente(this.cliente);
    this.form.reset();
    this.cerrarModal();
  }
  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  getSaldoTotal(){
    let saldoTotal:number=0;
    if (this.clientes){
      this.clientes.forEach( cliente=>{
        saldoTotal += Number(cliente.saldo!);
      })
    }
    return saldoTotal;
  }
  
}
