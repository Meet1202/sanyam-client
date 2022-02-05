import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddphotosPageRoutingModule } from './addphotos-routing.module';

import { AddphotosPage } from './addphotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddphotosPageRoutingModule
  ],
  declarations: [AddphotosPage]
})
export class AddphotosPageModule {}
