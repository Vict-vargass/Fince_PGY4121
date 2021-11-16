import { Component, OnInit, ɵdetectChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CrudStorageService } from '../crud-storage.service';
@Component({
  selector: 'app-persona-home',
  templateUrl: './persona-home.page.html',
  styleUrls: ['./persona-home.page.scss'],
})
export class PersonaHomePage implements OnInit {

  lista:any;
  arg=null; 
  estadoCrearMeta=false;
  estadoListarMeta=false;
  estadoEditar = false;
  listaMetas:any;
  listaMetaMia:any;
  constructor( 
    private actRouter: ActivatedRoute,
    private crud : CrudStorageService,
    private router : Router,
    private alert : AlertController, 
    private toast : ToastController
    ) { }
   ngOnInit() {
    this.arg= this.actRouter.snapshot.paramMap.get('nombre').toString()
    this.crud.$getObjectSource.subscribe(data => {
      this.lista = data
    }).unsubscribe();  
    this.crud.init();
    console.log(this.lista);
  } 

  abrirMeta(){
    this.estadoCrearMeta= true;
  }
  cancelarCrearMeta(){
    this.estadoCrearMeta= false;
  }

  async crearMeta(nombreMeta: HTMLInputElement,monto:HTMLInputElement, montoDeseado: HTMLInputElement){ 
    let id = this.listaMetaMia.length + 1;
    const datos = [{"id": id, "correo":this.lista[0].correo,
      "nombreMeta":nombreMeta.value, "monto":monto.value, "montoDeseado":montoDeseado.value  
    }]
    const toast = await this.toast.create({
      message: 'Registro exitoso' ,
      duration: 3000,
      color: "success",
      position: "middle"
    });
    toast.present();
      this.crud.setMeta(id,datos)
      this.cancelarCrearMeta();
  }

  listarMetas(){
    this.estadoListarMeta=true;
    this.listaMetaMia = this.crud.listarMeta(this.lista[0].correo)
  }
  cerrarListado(){
    this.estadoListarMeta=false;
  }
  
  async borrarMeta(correo:any,id:any){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Antes de eliminar la meta...',
      message: '<strong>¿Está seguro de que desea eliminarla?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, 
        {
          text: 'Si',
          handler: () => {
            this.crud.borrarMeta(correo,id)
          }
        }
      ]
    });

    await alert.present();
  }

  abrirEditar(){
    this.estadoEditar = true;
  }

  cerrarModificar(){
    this.estadoEditar = false;
  }

  async modificarMeta(correo:any, id:any, nombreMetaEd:HTMLInputElement, montoEd : HTMLInputElement, montoDeseadoEd: HTMLInputElement ){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Registro existente',
      message: '<strong>¿Está seguro de cambiar los datos?</strong>!!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, 
        {
          text: 'Si',
          handler: () => {
            this.crud.modificarMeta(correo, id, nombreMetaEd.value, montoEd.value, montoDeseadoEd.value)
            this.estadoEditar= false;
            this.listarMetas()
          }
        }
      ]
    });

    await alert.present();
  }

}
