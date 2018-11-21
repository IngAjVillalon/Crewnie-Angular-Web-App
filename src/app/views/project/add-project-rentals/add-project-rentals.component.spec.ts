import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectRentalsComponent } from './add-project-rentals.component';

describe('AddProjectRentalsComponent', () => {
  let component: AddProjectRentalsComponent;
  let fixture: ComponentFixture<AddProjectRentalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectRentalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
