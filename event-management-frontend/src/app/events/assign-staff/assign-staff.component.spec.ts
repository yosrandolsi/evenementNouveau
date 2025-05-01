import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStaffComponent } from './assign-staff.component';

describe('AssignStaffComponent', () => {
  let component: AssignStaffComponent;
  let fixture: ComponentFixture<AssignStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignStaffComponent]
    });
    fixture = TestBed.createComponent(AssignStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
