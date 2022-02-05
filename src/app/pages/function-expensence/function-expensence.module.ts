import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FunctionExpensencePageRoutingModule } from './function-expensence-routing.module';

import { FunctionExpensencePage } from './function-expensence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FunctionExpensencePageRoutingModule
  ],
  declarations: [FunctionExpensencePage]
})
export class FunctionExpensencePageModule {}
