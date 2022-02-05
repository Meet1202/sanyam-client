import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class CheckUserService {

    id = localStorage.getItem('key');
    active = true;

    constructor(
        public afAuth: AngularFireAuth,
        private router: Router,
        private firestore: AngularFirestore,
        public alertController: AlertController,
    ) {

    }

    checkUser() {

        this.firestore.doc(`users/` + this.id).valueChanges()
            .subscribe((data: any) => {
                if (!data) {
                    console.log('no!!!!!!!!');
                    this.forceLogout();
                } else {
                    console.log('yes!!!!!!');
                }
            });
    }

    async forceLogout() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Account removed!',
            message: 'Your account have been removed from Sanyam Group contact to Director of Sanyam Group.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                        this.router.navigate([`/menu/dashboard/${this.id}`]);
                        this.active = false;
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

}
