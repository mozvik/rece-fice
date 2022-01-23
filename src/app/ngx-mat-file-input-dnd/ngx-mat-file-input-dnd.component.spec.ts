import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatFileInputDndComponent } from './ngx-mat-file-input-dnd.component';

describe('NgxMatFileInputDndComponent', () => {
  let component: NgxMatFileInputDndComponent;
  let fixture: ComponentFixture<NgxMatFileInputDndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMatFileInputDndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatFileInputDndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
