import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbDatepickerComponent } from './mb-datepicker.component';

describe('MbDatepickerComponent', () => {
  let component: MbDatepickerComponent;
  let fixture: ComponentFixture<MbDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
