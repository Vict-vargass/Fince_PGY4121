import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudStorageService {
  
  private objectSource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectSource.asObservable();

  constructor(private storage: Storage) { 
    this.init();
  }

  async init()
  {
    // crea el storage para ser usado en el proyecto
    await this.storage.create();
  }
  async set(valor:any)
  {
    //let id = await this.storage.length() + 1;
    //await this.storage.set(id.toString() , valor);
    await this.storage.set(valor[0].correo , valor);
  }

  async get(key : string)
  { // rescata el valor según la key
    return await this.storage.get(key);
  }

  listar()
  {
    let items=[];
    this.storage.forEach((v,k)=>{ items.push(v); })
    return items;
  }

  delete_all(){
    this.storage.clear()
  }
  sendData(data:any){
    this.objectSource.next(data);
  }

  async setMeta(id:any,valor:any)
  {
    await this.storage.set(id.toString() , valor);
    //await this.storage.set(valor[0].correo , valor);
  }

  listarMeta(correo:string){
    let items = [];
    this.storage.forEach((value, key) => {
      if (value[0].correo==correo && key !=correo){
        items.push(value);
        console.log("items",items);
        console.log("Key", key)
        
      }else{
        console.log("no value found");
      }
    })
    return items
  }

  borrarMeta(correo:any, id:any){
    console.log(id)
    console.log(correo);
    this.storage.forEach((value, key) =>{
      if (value[0].correo==correo){
        if(key !=correo){
          console.log("valuesBorrar",value)
          console.log("keyBorrar",key)
          console.log("idBorrar", value[0].id);
          console.log("idVar",id)
          if(id.toString()==key){
            this.storage.remove(id)
          }
        }
      }
    })
  }
  
  modificarMeta(correo:any, id:any, nombreMetaEd, montoEd, montoDeseadoEd){
    console.log(id)
    console.log(correo);
    let datos = [{"id": id, "correo":correo,
    "nombreMeta":nombreMetaEd, "monto":montoEd, "montoDeseado":montoDeseadoEd  
  }]
    this.storage.forEach((value, key) =>{
      if (value[0].correo==correo){
        if(key !=correo){
          console.log("valuesBorrar",value)
          console.log("keyBorrar",key)
          console.log("idBorrar", value[0].id);
          console.log("idVar",id)
          if(id.toString()==key){
            this.storage.set(id,datos);
          }
        }
      }
    }) 
  }

}
