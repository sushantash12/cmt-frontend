import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveAdminsComponent } from './add-remove-admins.component';

describe('AddRemoveAdminsComponent', () => {
  let component: AddRemoveAdminsComponent;
  let fixture: ComponentFixture<AddRemoveAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRemoveAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
