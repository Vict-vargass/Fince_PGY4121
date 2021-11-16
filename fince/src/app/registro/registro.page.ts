import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CrudStorageService } from '../crud-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    private crud: CrudStorageService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }
  listado = [];  
  ngOnInit() {
  }

  async crear(correo : HTMLInputElement, contra: HTMLInputElement, nombre: HTMLInputElement,
    )
  {
    const datos = [{"correo" : correo.value, "contrasenia":contra.value,"nombre":nombre.value}];

    const valor = await this.crud.get(correo.value);

    if (correo.value.length == 0 || nombre.value.length==0 || contra.value.length ==0){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Campos requeridos',
        message: 'Complete todos los campos para realizar el registro',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
    }else{
          // permite saber que existe el correo
    if(valor != null && valor.length > 0)
    {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Correo existente',
        message: 'El correo ingresado se encuentra registrado',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
  
      await alert.present();
    }
    else
    {
      this.crud.set(datos);
      const toast = await this.toastController.create({
        message: 'Registro exitoso' ,
        duration: 3000,
        color: "success",
        position: "middle"
      });
      toast.present();
      //this.router.navigate(['/home'])
    }
    }
  }
}

