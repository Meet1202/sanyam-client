import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense.model';
import { AngularFirestore } from '@angular/fire/firestore';
import {LoadingController, AlertController, Platform, ModalController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoaderService } from 'src/app/services/loading-service/loader.service';
import { CheckUserService } from 'src/app/services/checkUser/check-user.service';
import {ExpenseDetailPage} from '../expense-detail/expense-detail.page';

@Component({
  selector: 'app-function-expensence',
  templateUrl: './function-expensence.page.html',
  styleUrls: ['./function-expensence.page.scss'],
})
export class FunctionExpensencePage implements OnInit {

  expense = {} as Expense;
  expenses: any;
  id: any;
  subscribe: any;
  dataFound: boolean;

  constructor(
    private loading: LoaderService,
    private firestore: AngularFirestore,
    private router: Router,
    public alertCtrl: AlertController,
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private checkUser: CheckUserService,
    public modalController: ModalController
  ){
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    this.id = localStorage.getItem('key');
    this.getMessages();
   }

   ionViewWillEnter() {
    this.checkUser.checkUser();
  }

  async getMessages(){
    try{
      await this.loading.present();
      this.firestore.collection('expense', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .subscribe(data => {
        this.expenses = data.map(e => {
         if(e){
           this.dataFound = true;
           return{
             id: e.payload.doc['id'],
             functionName: e.payload.doc.data()['functionName'],
             money: e.payload.doc.data()['money'],
             description: e.payload.doc.data()['description'],
             date: e.payload.doc.data()['date'],
           };
         }else {
           this.dataFound = false;
         }
        });
      });
      await this.loading.dismiss();
    }catch (err){
      await this.loading.dismiss();
      console.log(err);
    }
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ExpenseDetailPage,
      cssClass: 'my-custom-class',
      componentProps: {
        id: id
      }
    });
    return await modal.present();
  }
}
