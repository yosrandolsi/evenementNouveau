import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneventsComponent } from './gestionevents.component';

describe('GestioneventsComponent', () => {
  let component: GestioneventsComponent;
  let fixture: ComponentFixture<GestioneventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioneventsComponent]
    });
    fixture = TestBed.createComponent(GestioneventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
