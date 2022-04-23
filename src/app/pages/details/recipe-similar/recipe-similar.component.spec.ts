import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSimilarComponent } from './recipe-similar.component';

describe('RecipeSimilarComponent', () => {
  let component: RecipeSimilarComponent;
  let fixture: ComponentFixture<RecipeSimilarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeSimilarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSimilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
