import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoaderService} from '../../services/loading-service/loader.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {ModalController} from '@ionic/angular';
import {Images} from '../../models/image.model';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.page.html',
  styleUrls: ['./media-detail.page.scss'],
})
export class MediaDetailPage implements OnInit {
  @Input() id: string;
  media = {} as Images;
  constructor(
      private actRoute: ActivatedRoute,
      private loading: LoaderService,
      private firestore: AngularFirestore,
      private ref: ChangeDetectorRef,
      public modalController: ModalController,
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getMediaDetail(this.id);
  }

  getMediaDetail(id){
    this.loading.present();
    this.firestore
        .doc('function-images/' + id)
        .valueChanges()
        .subscribe(data => {
          console.log(data);
          this.media.functionName = data['functionName'];
          this.media.imgLink = data['imgLink'];
          this.media.date = data['date'];
        });
    this.ref.detectChanges();
    this.loading.dismiss();
  }
}
