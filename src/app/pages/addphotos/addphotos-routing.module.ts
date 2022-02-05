import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddphotosPage } from './addphotos.page';

const routes: Routes = [
  {
    path: '',
    component: AddphotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddphotosPageRoutingModule {}
