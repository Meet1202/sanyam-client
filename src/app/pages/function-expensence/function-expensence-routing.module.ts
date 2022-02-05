import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunctionExpensencePage } from './function-expensence.page';

const routes: Routes = [
  {
    path: '',
    component: FunctionExpensencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FunctionExpensencePageRoutingModule {}
