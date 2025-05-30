import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryModalComponent } from './create-category-modal.component';

describe('CreateCategoryModalComponent', () => {
  let component: CreateCategoryModalComponent;
  let fixture: ComponentFixture<CreateCategoryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCategoryModalComponent]
    });
    fixture = TestBed.createComponent(CreateCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
