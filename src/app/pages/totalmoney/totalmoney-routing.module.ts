import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotalmoneyPage } from './totalmoney.page';

const routes: Routes = [
  {
    path: '',
    component: TotalmoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotalmoneyPageRoutingModule {}
