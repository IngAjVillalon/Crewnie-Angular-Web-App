import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingCalendarComponent } from './casting-calendar.component';

describe('CastingCalendarComponent', () => {
  let component: CastingCalendarComponent;
  let fixture: ComponentFixture<CastingCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastingCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
