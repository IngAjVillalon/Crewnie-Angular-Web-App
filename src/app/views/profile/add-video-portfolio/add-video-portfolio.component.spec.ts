import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoPortfolioComponent } from './add-video-portfolio.component';

describe('AddVideoPortfolioComponent', () => {
  let component: AddVideoPortfolioComponent;
  let fixture: ComponentFixture<AddVideoPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVideoPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVideoPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
