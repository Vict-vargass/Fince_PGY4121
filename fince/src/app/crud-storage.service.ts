import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CrudStorageService {
  private key = 0;
  private listado = [];
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
}
