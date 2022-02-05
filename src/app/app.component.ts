import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Platform} from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import {StatusBar, Style} from '@capacitor/status-bar';

import { PushNotifications } from '@capacitor/push-notifications';
import {Router} from '@angular/router';
import {Dialog} from '@capacitor/dialog';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  // @ts-ignore
  constructor(
      private platform: Platform,
      private location: Location,
      private router: Router
  ) {
    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this.location.isCurrentPathEqualTo('/menu/dashboard')) {
        navigator['app'].exitApp();
      } else {
        this.location.back();
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setStyle({style: Style.Default});
      SplashScreen.show({
        showDuration: 2000,
        autoHide: true
      });
    });
  }

  ngOnInit() {
    PushNotifications.register();

    PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
    });

    PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    PushNotifications.addListener('pushNotificationReceived', notification => {
      const audio = new Audio('assets/notification.mp3');
      audio.play();
      console.log('Push notification received: ', notification);
      Dialog.alert({
        title: notification.title,
        message: notification.body,
      });
    });

    PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
      this.router.navigate(['/menu/notification']);
    });
  }
}
