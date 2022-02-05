import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireStorage} from '@angular/fire/storage';
import { RouteReuseStrategy } from '@angular/router';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    // AngularFireStorage
  ],
  declarations: [MenuPage],
  providers: [
    //FileSizeFormatPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // NativeStorage
  ],
})
export class MenuPageModule {}
