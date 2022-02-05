import {Component, OnInit} from '@angular/core';
import {LoadingController, AlertController, Platform} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {LoaderService} from 'src/app/services/loading-service/loader.service';
import {ToastService} from 'src/app/services/toast-service/toast.service';
import {CheckUserService} from 'src/app/services/checkUser/check-user.service';

@Component({
  selector: 'app-totalmoney',
  templateUrl: './totalmoney.page.html',
  styleUrls: ['./totalmoney.page.scss'],
})
export class TotalmoneyPage implements OnInit {

  users: any = [];
  year: any;
  yearly: any;
  month: any;
  totalMoney = 0;
  yearlyMoney = 0;
  yearOptions = [];
  monthOptions = [];

  id: string;
  subscribe: any;

  constructor(
    private loading: LoaderService,
    private firestore: AngularFirestore,
    private router: Router,
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private toast: ToastService,
    private checkUser: CheckUserService
  ) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('key');
    this.getUsers();
    this.setMonthAndYearOptions();
  }

  ionViewWillEnter() {
    this.checkUser.checkUser();
  }

  async getUsers() {
    try {
      this.firestore.collection('users')
        .snapshotChanges()
        .subscribe(data => {
          this.users = data.map(e => ({
            id: e.payload.doc['id'],
            username: e.payload.doc.data()['username'],
            amount: e.payload.doc.data()['amount']
          }));
        });
    } catch (err) {
      console.log(err);
    }
  }

  setMonthAndYearOptions() {
    this.monthOptions = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const endDate = 2050 || new Date().getFullYear();
    let startYear = 2020;
    for (let i = startYear; i <= endDate; i++) {
      this.yearOptions.push(startYear);
      startYear++;
    }
  }

  showData() {
    let total = 0;
    const year = new Date(this.year);
    const month = new Date(this.month);
    for (const user of this.users) {
      if (user.id == this.id) {
        if (user.amount) {
          for (const data of user.amount) {
            const d = new Date(data.date);
            if (d.getFullYear() == year.getFullYear() && d.getMonth() == month.getMonth()) {
              total = total + data.money;
            } else {
              console.log('false');
              console.log(data.money);
            }
          }
        } else {
          console.log('user has no money');
        }
      } else {
        console.log('no user found');
      }

    }
    this.totalMoney = total;
    this.toast.openToast('Your Monthly Data - ' + this.totalMoney);
  }

  yearlyData() {
    let total = 0;
    const yearly = new Date(this.yearly);
    for (const user of this.users) {
      if (user.amount) {
        for (const data of user.amount) {
          if (user.id == this.id) {
            const d = new Date(data.date);
            if (d.getFullYear() == yearly.getFullYear()) {
              total = total + data.money;
            } else {
              // console.log('false')
              // console.log(data.money);
            }
          }

        }
      } else {
        console.log('user have no money');
      }
    }
    this.yearlyMoney = total;
    this.toast.openToast('Your Yearly Data - ' + this.yearlyMoney);
    total = 0;
  }
}
