import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileuserPageRoutingModule } from './profileuser-routing.module';

import { ProfileuserPage } from './profileuser.page';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileuserPageRoutingModule
  ],
  declarations: [ProfileuserPage],
  providers: []
})
export class ProfileuserPageModule {}
