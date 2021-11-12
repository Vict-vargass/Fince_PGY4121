import { Component, OnInit } from '@angular/core';
import { CrudStorageService } from '../crud-storage.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private crud: CrudStorageService,
    private alertController: AlertController,
    private router: Router
  ) { }
    listado=[]
  ngOnInit() {
  }

  async entrar(correo: HTMLInputElement, contra: HTMLInputElement)
  {
    const valor_correo = await this.crud.get(correo.value)
    if (correo.value.length==0 || contra.value.length== 0 ){
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
      if (valor_correo !=null && valor_correo.length >0 ){
        this.listado = valor_correo
        if(this.listado[0].correo == correo.value && this.listado[0].contrasenia == contra.value){
          this.router.navigate(['/home'])
        }else{
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Correo o contraseña invalidos',
            message: 'Por favor, ingrese nuevamente su correo y contraseña',
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
    }
  }

}
