import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeRatingsComponent } from './recipe-ratings.component';

describe('RecipeRatingsComponent', () => {
  let component: RecipeRatingsComponent;
  let fixture: ComponentFixture<RecipeRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeRatingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
