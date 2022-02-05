import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FunctionExpensencePage } from './function-expensence.page';

describe('FunctionExpensencePage', () => {
  let component: FunctionExpensencePage;
  let fixture: ComponentFixture<FunctionExpensencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionExpensencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FunctionExpensencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
