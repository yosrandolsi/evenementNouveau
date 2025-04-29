import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillModalComponent } from './add-skill-modal.component';

describe('AddSkillModalComponent', () => {
  let component: AddSkillModalComponent;
  let fixture: ComponentFixture<AddSkillModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSkillModalComponent]
    });
    fixture = TestBed.createComponent(AddSkillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
