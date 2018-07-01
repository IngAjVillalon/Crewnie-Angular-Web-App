import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverLetterDialogComponent } from './cover-letter-dialog.component';

describe('CoverLetterDialogComponent', () => {
  let component: CoverLetterDialogComponent;
  let fixture: ComponentFixture<CoverLetterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverLetterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverLetterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
