import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotalmoneyPageRoutingModule } from './totalmoney-routing.module';

import { TotalmoneyPage } from './totalmoney.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotalmoneyPageRoutingModule
  ],
  declarations: [TotalmoneyPage]
})
export class TotalmoneyPageModule {}
