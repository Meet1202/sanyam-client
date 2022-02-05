import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { LoaderService } from 'src/app/services/loading-service/loader.service';
import { ToastService } from 'src/app/services/toast-service/toast.service';
import { CheckUserService } from 'src/app/services/checkUser/check-user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  feedback = {} as Feedback;
  feeds: any;
  id: string;
  subscribe: any;
  dataFound: boolean;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public alertCtrl: AlertController,
    public plt: Platform,
    private loading: LoaderService,
    private toast: ToastService,
    private checkUser: CheckUserService) {
  }

  ngOnInit() {
    this.feedback.email = localStorage.getItem('email');
    this.id = localStorage.getItem('key');
    console.log(this.feedback.email);
  }

  ionViewWillEnter() {
    this.checkUser.checkUser();
    this.getMessages();
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }

  async send(feedback) {
    this.feedback.date = Date.now();
    try {
      this.loading.present();
      await this.firestore.collection('feebacks').add(feedback);
      this.loading.dismiss();
      this.feedback.message = '';
      this.toast.openToast('Feedback Send successfully!');
    } catch (err) {
      console.log(err);
      this.toast.openToast('Error,Something went wrong!');
    }
  }

  async getMessages() {
    try {
      this.loading.present();
      this.firestore.collection('feebacks', ref => ref.orderBy('date', 'desc'))
        .snapshotChanges()
        .subscribe(data => {
          this.feeds = data.filter(e => {
            if (e.payload.doc.data()['email'] === this.feedback.email) {
              this.dataFound = true;
              return {
                id: e.payload.doc['id'],
                message: e.payload.doc.data()['message'],
                email: e.payload.doc.data()['email'],
                date: e.payload.doc.data()['date'],
              };
            }
          });

          this.feeds = this.feeds.map(e => {
            return {
              id: e.payload.doc['id'],
              message: e.payload.doc.data()['message'],
              email: e.payload.doc.data()['email'],
              date: e.payload.doc.data()['date'],
            };
          });
          console.log('feeds', this.feeds);
          this.loading.dismiss();
        });
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFeedBack(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure you want to Delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async () => {
            try{
              this.loading.present();
              this.firestore.collection('feebacks').doc(id).delete()
              this.loading.dismiss();
              this.toast.openToast('Deleted Successfully!');
            }catch (e){
              this.toast.openToast('Failed, Something went wrong!');
            }
          }
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();
  }
}
