import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Notify } from '../../models/notification.model';
import { LoaderService } from 'src/app/services/loading-service/loader.service';
import { CheckUserService } from 'src/app/services/checkUser/check-user.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notify = {} as Notify;
  notifies: any;
  subscribe: any;
  id: any;
  notificationCount: number;
  isNavigated = false;
  dataFound: boolean;

  constructor(
              private firestore: AngularFirestore,
              private router: Router,
              private platform: Platform,
              private loading: LoaderService,
              private checkUser:CheckUserService) { }

  ngOnInit() { }

  ionViewWillEnter(){
    this.checkUser.checkUser();
    this.isNavigated = true;
    this.getMessages();
  }

  async getMessages(){
    try{
      this.loading.present();
      await this.firestore.collection("notifications",ref=>ref.orderBy('date', "desc"))
      .snapshotChanges()
      .subscribe(data =>{
        console.log(1111);
        this.notifies = data.map(e=>{
          if(e){
            this.dataFound = true;
            return{
              id: e.payload.doc['id'],
              message: e.payload.doc.data()['message'],
              email: e.payload.doc.data()['email'],
              date: e.payload.doc.data()['date'],
            };
          }else{
            this.dataFound = false;
          }
        });
        this.notificationCount = data.length;
        if(this.isNavigated == true){
          localStorage.setItem('notificationReads', this.notificationCount.toString());
          this.isNavigated = false;
        }
        this.loading.dismiss();
      });

    }catch(err){
      console.log(err)
    }
  }

}
