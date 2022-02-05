import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TotalmoneyPage } from './totalmoney.page';

describe('TotalmoneyPage', () => {
  let component: TotalmoneyPage;
  let fixture: ComponentFixture<TotalmoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalmoneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TotalmoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
