import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonaHomePageRoutingModule } from './persona-home-routing.module';

import { PersonaHomePage } from './persona-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaHomePageRoutingModule
  ],
  declarations: [PersonaHomePage]
})
export class PersonaHomePageModule {}
