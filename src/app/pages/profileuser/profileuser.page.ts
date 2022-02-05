import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../../models/users.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, Platform} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {LoaderService} from 'src/app/services/loading-service/loader.service';
import {ToastService} from 'src/app/services/toast-service/toast.service';
import {CheckUserService} from 'src/app/services/checkUser/check-user.service';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';


@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.page.html',
  styleUrls: ['./profileuser.page.scss'],
})
export class ProfileuserPage implements OnInit {

  user = {} as User;
  imgurl: string;
  id: any;
  selectedFile: any;
  disabled = false;
  subscribe: any;
  image: any;

  constructor(
    private actRoute: ActivatedRoute,
    private loading: LoaderService,
    private firestore: AngularFirestore,
    private firestorage: AngularFireStorage,
    private router: Router,
    public alertController: AlertController,
    private platform: Platform,
    private toast: ToastService,
    private checkUser: CheckUserService,
    private ref: ChangeDetectorRef
    // private camera: Camera
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.getUserById(this.id);
  }
  ionViewWillEnter() {
    this.checkUser.checkUser();
   }

  async getUserById(id: string){
    this.loading.present();
    this.firestore
      .doc('users/' + id)
      .valueChanges()
      .subscribe(data => {
        this.user.email = data['email'];
        this.user.username = data['username'];
        this.user.number = data['number'];
        this.user.image = data['image'];
      });
    this.image = this.user.image;
    this.ref.detectChanges();
    this.loading.dismiss();
  }

  async updateUser(user: User){
    try{
      await this.loading.present();
      const imageUrl = this.uploadFile(this.id, this.selectedFile);
      imageUrl.then((data) => {
        this.user.image = data || 'assets/img/person-icon.png';
        this.firestore.doc(`users/${this.id}`).update(user);
        this.loading.dismiss();
        this.toast.openToast('User Updated successfully!');
        this.router.navigate(['/menu/profile']);
      });
    }catch (err){
      await this.toast.openToast('Failed, Something went wrong!');
    }
  }

  chooseFile(event){
    if (event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.image = e.target.result;
        this.selectedFile = event.target.files;
      };
    }
  }

  async uploadFile(id, file): Promise <any>{
    if (file && file.length){
      try{
        const task = await this.firestorage.ref('user-images').child(id).put(file[0]);
        this.firestorage.ref(`user-images/${id}`).getDownloadURL().subscribe((data) => {
          console.log('imageData::', data);
        });
        return this.firestorage.ref(`user-images/${id}`).getDownloadURL().toPromise();
      }catch (err){
        console.log(err);
      }
    }
  }

  uploadImage(){
    console.log('inside function');
    const options = {
      quality: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
      allowEditing: true
    };
    Camera.getPhoto(options).then((imageData) => {
      console.log(imageData);
      if (imageData && imageData.dataUrl){
        this.image = imageData.dataUrl;
      }
    }).catch (err => {
      console.log(err);
    });
  }

}
