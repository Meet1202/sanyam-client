import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/users.model';
import { CheckUserService } from 'src/app/services/checkUser/check-user.service';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})


export class MenuPage implements OnInit {
  user = {} as User;
  id: any;
  pages = [
    {
      icon: 'fas fa-th-large',
      title: 'Dashboard',
      url: '/menu/dashboard'
    },
    {
      icon: 'fas fa-user-circle',
      title: 'Profile',
      url: `/menu/profile`
    },
    {
      icon: 'fas fa-photo-video',
      title: 'Function Media',
      url: '/menu/addphotos'
    },
    {
      icon: 'fas fa-file-invoice-dollar',
      title: 'Function Expense',
      url: '/menu/function-expensence'
    },
    {
      icon: 'fas fa-wallet',
      title: 'Your Money',
      url: '/menu/totalmoney'
    },
     {
      icon: 'far fa-comment-alt',
      title: 'Feedback',
      url: '/menu/feedback'
    },
    {
      icon: 'far fa-question-circle',
      title: 'Help',
      url: '/menu/help'
    }
  ];

  selectedPath = '';
  constructor(private router: Router,
              private firestore: AngularFirestore,
              public checkUser: CheckUserService
              // private storage: NativeStorage,
            ) {
          this.router.events.subscribe((event: RouterEvent) => {
          this.selectedPath = event.url;
     });
   }

  ngOnInit() {
       this.id = localStorage.getItem('key');
       this.getUserById(this.id);
  }

  ionViewWillEnter() {
    this.checkUser.checkUser();
  }

  async getUserById(id: string){
    this.firestore
      .doc('users/' + id)
      .valueChanges()
      .subscribe(data => {
        this.user.username = data["username"];
        this.user.email = data["email"];
        this.user.image = data["image"];
      });
  }
}
