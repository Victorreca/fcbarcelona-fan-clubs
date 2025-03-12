import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFanclubsComponent } from './list-fanclubs.component';

describe('ListFanclubsComponent', () => {
  let component: ListFanclubsComponent;
  let fixture: ComponentFixture<ListFanclubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFanclubsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFanclubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
