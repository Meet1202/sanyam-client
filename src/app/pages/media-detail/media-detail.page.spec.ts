import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MediaDetailPage } from './media-detail.page';

describe('MediaDetailPage', () => {
  let component: MediaDetailPage;
  let fixture: ComponentFixture<MediaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
