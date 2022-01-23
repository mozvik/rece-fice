import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMatFileInputComponent } from './ng-mat-file-input.component';

describe('NgMatFileInputComponent', () => {
  let component: NgMatFileInputComponent;
  let fixture: ComponentFixture<NgMatFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgMatFileInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMatFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
