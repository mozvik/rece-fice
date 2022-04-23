import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeNutritionComponent } from './recipe-nutrition.component';

describe('RecipeNutritionComponent', () => {
  let component: RecipeNutritionComponent;
  let fixture: ComponentFixture<RecipeNutritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeNutritionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
