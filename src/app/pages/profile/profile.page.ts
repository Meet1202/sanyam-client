import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/users.model';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform, IonRouterOutlet, AlertController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loading-service/loader.service';
import { CheckUserService } from 'src/app/services/checkUser/check-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {} as User;
  id:any;
  subscribe:any;
  users:any=[];
  mentorNumber:any;

  constructor(private router:Router,
              private firestore: AngularFirestore,
              // private storage: NativeStorage,
              private platform: Platform,
              public alertController: AlertController,
              private loading: LoaderService,
              private checkUser:CheckUserService
    ) {
    }

  ngOnInit() {
    this.id = localStorage.getItem('key')
    //  this.id = this.storage.getItem('key')
    console.log(this.id)
  this.getUserById(this.id);
  this.getAllUser();
  }

  ionViewWillEnter() {
    this.checkUser.checkUser();
  }

  async getUserById(id:string){
    this.loading.present();
    this.firestore
      .doc("users/"+id)
      .valueChanges()
      .subscribe(data=>{
        this.user.email = data["email"];
        this.user.username = data["username"];
        this.user.joiningdate = data["joiningdate"];
        this.user.number = data["number"];
        this.user.designation = data["designation"];
        this.user.mentor = data["mentor"];
        this.user.image = data["image"];
        this.loading.dismiss();
      });
  }

  async getAllUser(){
    try{
      this.firestore.collection("users")
      .snapshotChanges()
      .subscribe(data =>{
        this.users = data.map(e=>{
          return{
            id: e.payload.doc['id'],
            username: e.payload.doc.data()['username'],
            designation: e.payload.doc.data()['designation'],
            number: e.payload.doc.data()['number'],
          };
        });
        for(let user of [this.users]){
         for(let data of user){
          // console.log(this.user.mentor);
          console.log(data.username);
          if(data.username === this.user.mentor){
            this.mentorNumber = data.number;
            console.log('inside if::',data.username);
         }
         else{
           console.log("elseBlock")
         }
         }
        }
        console.log('show mentor number::',this.mentorNumber);
      });
    }catch(err){
      console.log(err)
    }
  }


}
