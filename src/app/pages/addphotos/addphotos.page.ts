import { Component, OnInit } from '@angular/core';
import { Images } from 'src/app/models/image.model';
import {LoadingController, AlertController, Platform, ModalController, PopoverController} from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from 'src/app/services/loading-service/loader.service';
import { CheckUserService } from 'src/app/services/checkUser/check-user.service';
import {ExpenseDetailPage} from '../expense-detail/expense-detail.page';
import {MediaDetailPage} from '../media-detail/media-detail.page';
@Component({
  selector: 'app-addphotos',
  templateUrl: './addphotos.page.html',
  styleUrls: ['./addphotos.page.scss'],
})
export class AddphotosPage implements OnInit {
  image = {} as Images;
  images:any;
  id:any;
  subscribe: any;
  dataFound: boolean;

  constructor(
              private firestore: AngularFirestore,
              private router: Router,
              public alertCtrl: AlertController,
              public afAuth: AngularFireAuth,
              private platform: Platform,
              private loading: LoaderService,
              private checkUser: CheckUserService,
              public popoverController: PopoverController
  ){
  }

  async presentAlert(title:string, content:string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    this.id = localStorage.getItem('key')
    this.getMessages();
   }

   ionViewWillEnter() {
    this.checkUser.checkUser();
   }

  async getMessages() {
    try{
      this.loading.present();
      this.firestore.collection('function-images',ref=>ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .subscribe(data =>{
        if(data){
          this.dataFound = true;
          this.images = data.map(e=>{
            return{
              id: e.payload.doc['id'],
              functionName: e.payload.doc.data()['functionName'],
              imgLink: e.payload.doc.data()['imgLink'],
              date: e.payload.doc.data()['date'],
            };
          });
        }else{
          this.dataFound = false;
        }
      });
      this.loading.dismiss();
    }catch(err){
      console.log(err);
    }
  }

  async presentPopover(id) {
    const popover = await this.popoverController.create({
      component: MediaDetailPage,
      cssClass: 'my-custom-class',
      translucent: true,
      animated: true,
      componentProps: {
        id: id
      }
    });
    await popover.present();

    const {role} = await popover.onDidDismiss();
  }
}
