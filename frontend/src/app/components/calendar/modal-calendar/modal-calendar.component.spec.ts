import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCalendarComponent } from './modal-calendar.component';

describe('ModalCalendarComponent', () => {
  let component: ModalCalendarComponent;
  let fixture: ComponentFixture<ModalCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
