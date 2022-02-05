import { Component, OnInit } from '@angular/core';
import {AlertController, IonRouterOutlet} from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth, } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loading-service/loader.service';
import { User } from 'src/app/models/users.model';
import { CheckUserService } from 'src/app/services/checkUser/check-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  user = {} as User;
  users = [];
  subscribe: any;
  showMentors = [];
  showDirectors: any = {
    image: '',
    username: '',
    designation: '',
    number: ''
  };
  notificationReads: number;
  unReadCounts: number;
  totalUsers = 0;
  totalFuntions = 0;

  constructor(
    private firestore: AngularFirestore,
    public alertController: AlertController,
    private router: Router,
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private loading: LoaderService,
    private checkUser: CheckUserService,
  ) {
  }

  ngOnInit() {
    this.getUsers();
    this.getFunctions();
  }

  ionViewWillEnter() {
    this.checkUser.checkUser();
    this.getMessages();
    this.notificationReads = +localStorage.getItem('notificationReads') || 0;
    localStorage.setItem('notificationReads', this.notificationReads.toString());
  }


  async getUsers() {
    try {
      await this.loading.present();
      this.firestore.collection('users', ref => ref.orderBy('username'))
        .snapshotChanges()
        .subscribe((data: any) => {
          this.users = data.map(e => {
            return {
              id: e.payload.doc.id,
              email: e.payload.doc.data().email,
              username: e.payload.doc.data().username,
              number: e.payload.doc.data().number,
              designation: e.payload.doc.data().designation,
              image: e.payload.doc.data().image,
            };
          });
          this.showMentors = [];
          // tslint:disable-next-line:no-shadowed-variable
          for (const data of this.users) {
            if (data.designation === 'Mentor') {
              this.showMentors.push(data);
            }
          }

          // tslint:disable-next-line:no-shadowed-variable
          for (const data of this.users) {
            if (data.designation === 'Director') {
              this.showDirectors = {
                image: data.image,
                username: data.username,
                designation: data.designation,
                number: data.number
              };
            }
          }
          console.log(this.showDirectors);
          
          this.totalUsers = this.users.length;
          this.loading.dismiss();
        });
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout!',
      message: 'Are you sure you want to logout?',
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
          handler: () => {
            this.afAuth.signOut();
            localStorage.removeItem('key');
            localStorage.removeItem('email');
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }

  async getMessages() {
    try {
      this.firestore.collection('notifications', ref => ref.orderBy('date', 'desc'))
        .snapshotChanges()
        .subscribe(data => {
          const notifyCounts = +localStorage.getItem('notificationReads');
          this.unReadCounts = data.length - notifyCounts;
        });
    } catch (err) {
      console.log(err);
    }
  }

  async getFunctions() {
    try {
      this.firestore.collection('expense')
          .snapshotChanges()
          .subscribe(data => {
            this.totalFuntions = data.length;
          });
    } catch (err) {
      console.log(err);
    }
  }
}
