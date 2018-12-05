import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantManagemantComponent } from './applicant-managemant.component';

describe('ApplicantManagemantComponent', () => {
  let component: ApplicantManagemantComponent;
  let fixture: ComponentFixture<ApplicantManagemantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantManagemantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantManagemantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
