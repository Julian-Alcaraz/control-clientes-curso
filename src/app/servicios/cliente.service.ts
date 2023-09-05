import { Injectable } from "@angular/core";
import{AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Cliente } from "../model/cliente.model";
import { Observable } from "rxjs";
import{map} from 'rxjs/operators'
@Injectable()
export class ClienteService{
    clientesColeccion: AngularFirestoreCollection<Cliente>;
    clienteDoc: AngularFirestoreDocument<Cliente>;

    clientes:Observable<Cliente[]>;
    cliente:Observable<Cliente>;

    // private db: AngularFirestore
    constructor(private db: AngularFirestore){
        this.clientesColeccion = db.collection('clientes',ref=>ref.orderBy('nombre','asc'));
    }
    getClientes():Observable<Cliente[]>{
        this.clientes=this.clientesColeccion.snapshotChanges().pipe(
            map(cambios=>{
                return cambios.map(accion=>{
                    const datos = accion.payload.doc.data()as Cliente;
                    datos.id= accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.clientes;
    }
    
    cargarCliente(cliente:Cliente){
        this.clientesColeccion.add(cliente);
    }
    getCliente(id:string): Observable<Cliente>{
        this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
        console.log(this.clienteDoc);
        return this.cliente = this.clienteDoc.snapshotChanges().pipe(
            map(accion => {
                if(accion.payload.exists === false){
                    return null
                }else{
                    const datos = accion.payload.data() as Cliente;
                    datos.id = accion.payload.id;
                    return datos as any;
                }
            })
        );
    }
    modificarCliente(cliente:Cliente){
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
    }
    eliminarCliente(cliente:Cliente){
        this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.delete();
    }
   

}