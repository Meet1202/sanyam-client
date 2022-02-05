import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaDetailPageRoutingModule } from './media-detail-routing.module';

import { MediaDetailPage } from './media-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaDetailPageRoutingModule
  ],
  declarations: [MediaDetailPage]
})
export class MediaDetailPageModule {}
