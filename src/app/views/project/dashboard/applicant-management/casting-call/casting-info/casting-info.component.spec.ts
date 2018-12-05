import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingInfoComponent } from './casting-info.component';

describe('CastingInfoComponent', () => {
  let component: CastingInfoComponent;
  let fixture: ComponentFixture<CastingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
