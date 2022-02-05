import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { LoaderService } from '../services/loading-service/loader.service';
import { ToastService } from '../services/toast-service/toast.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  email:any;
  subscribe: any;
  constructor(
              public afAuth: AngularFireAuth,
              private router: Router,
              public alertController: AlertController,
              private loading: LoaderService,
              private platform: Platform,
              private toast: ToastService,
  ) {
  }

  ngOnInit() {
  }

  async presentAlert(title:string, content:string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }

  async resetUserPwd() {
    try{
      this.loading.present();
      await this.afAuth.sendPasswordResetEmail(this.email).then((user) => {
        this.loading.dismiss();
        this.presentAlert('Success','We just sent a link to reset your password to your email.');
        this.toast.openToast('Reset password link is sent to your email.');
        this.router.navigate(['/']);
        }, (error) => {
          console.log(error);
          if(error.code === "auth/user-not-found"){
            this.loading.dismiss();
            this.toast.openToast('User not found!');
          }
          if(error.code === "auth/user-disabled"){
            this.loading.dismiss();
            this.toast.openToast('Your account was disabled please contact to admin!');
          }
          if(error.code === "auth/invalid-email"){
            this.loading.dismiss();
            this.toast.openToast('Invalid Email!');
          }
          if(error.code === "auth/network-request-failed"){
            this.loading.dismiss();
            this.toast.openToast('Network error!');
          }
        });
    }
    catch(err){
      console.log(err);
    }
   }
}
