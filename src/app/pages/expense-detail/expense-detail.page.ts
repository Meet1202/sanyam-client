import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoaderService} from '../../services/loading-service/loader.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Expense} from '../../models/expense.model';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.page.html',
  styleUrls: ['./expense-detail.page.scss'],
})
export class ExpenseDetailPage implements OnInit {

    @Input() id: string;
    expense = {} as Expense;
  constructor(
      private actRoute: ActivatedRoute,
      private loading: LoaderService,
      private firestore: AngularFirestore,
      private ref: ChangeDetectorRef,
      public modalController: ModalController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit() {
    this.getExpenseDetail(this.id);
  }
  getExpenseDetail(id){
    this.loading.present();
    this.firestore
        .doc('expense/' + id)
        .valueChanges()
        .subscribe(data => {
          console.log(data);
          this.expense.functionName = data['functionName'];
          this.expense.money = data['money'];
          this.expense.description = data['description'];
          this.expense.date = data['date'];
        });
    this.ref.detectChanges();
    this.loading.dismiss();
  }

    dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }
}
