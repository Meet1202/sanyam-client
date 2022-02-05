import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular'; 
import { UserService } from '../services/user/user.service';
import { User } from '../models/users.model';
import { LoaderService } from '../services/loading-service/loader.service';
import { ToastService } from '../services/toast-service/toast.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  person:User;
   user = {
    email: '',
    password:''
   }
  subscribe: any;
  disable=false;
  
  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private loading: LoaderService,
              public users: UserService,
              private platform: Platform,
              private toast: ToastService,
              ) {
              }

  ngOnInit() {
  }
  
  async login(){
    try{
      this.loading.present();
      const res = await this.afAuth.signInWithEmailAndPassword(this.user.email,this.user.password);
      this.loading.dismiss();
      if(res.user){
        this.users.setUser({
          uid: res.user.uid,
          email: res.user.email
        })
      }
      console.log(res);
      console.log(res.user.uid);
      localStorage.setItem("key",res.user.uid)
      localStorage.setItem("email",res.user.email)
      this.loading.dismiss();
      this.toast.openToast('You are loggedIn Successfully');
      this.router.navigate(['/menu/dashboard', res.user.uid]);
    }catch(err){
      console.log(err)
      if(err.code === "auth/user-not-found"){
        this.loading.dismiss();
        this.toast.openToast('Login Failed, User not found!');
      }
      if(err.code === "auth/wrong-password"){
        this.loading.dismiss();
        this.toast.openToast('Login Failed, Wrong password!');
      }
      if(err.code === "auth/user-disabled"){
        this.loading.dismiss();
        this.toast.openToast('Login Failed, Your account was disabled please contact to admin!');
      }
      if(err.code === "auth/invalid-email"){
        this.loading.dismiss();
        this.toast.openToast('Login Failed, Invalid Email!');
      }
      if(err.code === "auth/network-request-failed"){
        this.loading.dismiss();
        this.toast.openToast('Login Failed, Network error!');
      }
    }
  }
}
