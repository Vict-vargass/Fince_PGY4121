import { Component, OnInit, ɵdetectChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
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
  listaMetaMia:any;
  send:any;
  constructor( 
    private actRouter: ActivatedRoute,
    private crud : CrudStorageService,
    private router : Router,
    private alert : AlertController, 
    private toast : ToastController,
    private navCtrl: NavController,
    ) { }
   async ngOnInit() {
    this.arg = this.actRouter.snapshot.paramMap.get('correo').toString();
    this.lista= await this.crud.get(this.arg);
    this.crud.init();
    this.listaMetaMia = this.crud.listarMeta(this.lista[0].correo);
    
  } 

  abrirMeta(){
    this.estadoCrearMeta= true;
  }
  cancelarCrearMeta(){
    this.estadoCrearMeta= false;
  }

  async crearMeta(nombreMeta: HTMLInputElement,monto:HTMLInputElement, montoDeseado: HTMLInputElement){ 
    let id = this.listaMetaMia.length + 1;
    id = id + this.lista[0].correo
    if(this.listaMetaMia.length==3){
      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: 'Limite alcanzado',
        message: 'Solo se permiten crear 3 metas, puedes modificar o eliminar las existentes',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
      this.cancelarCrearMeta();
    }else{
      if(nombreMeta.value.length <=0 || monto.value.length <=0 || montoDeseado.value.length <= 0 ){
        const alert = await this.alert.create({
          cssClass: 'my-custom-class',
          header: 'Datos insuficientes',
          message: 'Para crear una meta, ingrese todos los valores a los campos',
          buttons: [
            {
              text: 'OK',
              role: 'cancel'
            }
          ]
        });
        await alert.present();
        
      }else{
        const datos = [{"id": id, "correo":this.lista[0].correo,
        "nombreMeta":nombreMeta.value, "monto":monto.value, "montoDeseado":montoDeseado.value  
        }];
        this.crud.setMeta(id,datos);
        const toast = await this.toast.create({
          message: 'Meta creada' ,
          duration: 3000,
          color: "success",
          position: "bottom"
        });
        toast.present();
        this.cancelarCrearMeta();
      }
      
    }
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
          text: 'Si',
          handler: () => {
            this.crud.borrarMeta(correo,id)
            this.cerrarListado()
          }
        },
        {
          text: 'No',
          role: 'cancel'
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
      header: 'Antes de seguir',
      message: '<strong>¿Está seguro de cambiar los datos de su meta?</strong>',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.crud.modificarMeta(correo, id, nombreMetaEd.value, montoEd.value, montoDeseadoEd.value)
            this.estadoEditar= false;
            this.listarMetas()
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }, 
      ]
    });

    await alert.present();
  }
  verIndicadores(){
    this.navCtrl.navigateForward(`/indicadores/${this.lista[0].correo}`);    
  }
}
