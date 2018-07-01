import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverPhotoDialogComponent } from './cover-photo-dialog.component';

describe('CoverPhotoDialogComponent', () => {
  let component: CoverPhotoDialogComponent;
  let fixture: ComponentFixture<CoverPhotoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverPhotoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverPhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
