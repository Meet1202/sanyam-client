import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddphotosPage } from './addphotos.page';

describe('AddphotosPage', () => {
  let component: AddphotosPage;
  let fixture: ComponentFixture<AddphotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddphotosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddphotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
