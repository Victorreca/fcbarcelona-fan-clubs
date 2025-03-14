import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFanclubComponent } from './add-edit-fanclub.component';

describe('AddEditFanclubComponent', () => {
  let component: AddEditFanclubComponent;
  let fixture: ComponentFixture<AddEditFanclubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditFanclubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFanclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
