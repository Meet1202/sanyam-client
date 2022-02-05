import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { CheckUserService } from 'src/app/services/checkUser/check-user.service';
import { Clipboard } from '@capacitor/clipboard';
import {ToastService} from "../../services/toast-service/toast.service";
@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  id: string;
  subscribe: any;
  copyEmail = '2019sanyamgroup@gmail.com';
  copyNumber = '9429913651';

  constructor(
    private router: Router,
    public plt: Platform,
    private checkUser: CheckUserService,
    private toast: ToastService,
  ) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('key');
  }
  ionViewWillEnter() {
    this.checkUser.checkUser();
  }

  copyText(text, option) {
    Clipboard.write({
      // eslint-disable-next-line id-blacklist
      string: text
    });
    this.toast.openToast(`${option} copied!`);
  }
}
