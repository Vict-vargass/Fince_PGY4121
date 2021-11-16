import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaHomePage } from './persona-home.page';

const routes: Routes = [
  {
    path: '',
    component: PersonaHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaHomePageRoutingModule {}
