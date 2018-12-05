import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantTransferComponent } from './applicant-transfer.component';

describe('ApplicantTransferComponent', () => {
  let component: ApplicantTransferComponent;
  let fixture: ComponentFixture<ApplicantTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
