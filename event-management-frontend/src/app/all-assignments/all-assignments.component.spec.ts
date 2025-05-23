import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssignmentsComponent } from './all-assignments.component';

describe('AllAssignmentsComponent', () => {
  let component: AllAssignmentsComponent;
  let fixture: ComponentFixture<AllAssignmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAssignmentsComponent]
    });
    fixture = TestBed.createComponent(AllAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
