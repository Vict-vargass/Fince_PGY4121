import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApirestService } from '../apirest.service';
import { CrudStorageService } from '../crud-storage.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.page.html',
  styleUrls: ['./indicadores.page.scss'],
})
export class IndicadoresPage implements OnInit {
  resultadoApi:any;
  estado=true
  key:string;
  data:any;
  resultadoCrud:any;
  constructor(
    private api : ApirestService, 
    private alertController : AlertController,
    private actRouter : ActivatedRoute,
    private crud : CrudStorageService,
    private navCtrl : NavController,
  ) { }

  async ngOnInit() {
    this.key = this.actRouter.snapshot.paramMap.get('correo').toString()
    this.data = await this.crud.get(this.key);
  }

  async mostrarValorMoneda(moneda: HTMLInputElement){
    
    if (moneda.value !=null){
      this.estado=true;
      await this.api.getValor(moneda.value);
      this.resultadoApi = await this.api.datos;
      let id = this.data[0].correo+moneda.value;
      this.crud.setApi(id, this.resultadoApi);
      this.resultadoCrud = await this.crud.get(id);
    }else{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Se requiere indicador',
        message: 'Seleccione el indicador economico de tu interes',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
    }
  }

  regresar(){
    this.navCtrl.navigateBack(`/persona-home/${this.key}`);
  }

  cerrar(){
    this.estado=false;
  }
}
