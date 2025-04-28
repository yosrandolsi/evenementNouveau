import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEventComponent } from './register-event.component';

describe('RegisterEventComponent', () => {
  let component: RegisterEventComponent;
  let fixture: ComponentFixture<RegisterEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterEventComponent]
    });
    fixture = TestBed.createComponent(RegisterEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
