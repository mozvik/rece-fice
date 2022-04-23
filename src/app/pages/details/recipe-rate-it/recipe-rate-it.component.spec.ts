import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeRateItComponent } from './recipe-rate-it.component';

describe('RecipeRateItComponent', () => {
  let component: RecipeRateItComponent;
  let fixture: ComponentFixture<RecipeRateItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeRateItComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeRateItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
