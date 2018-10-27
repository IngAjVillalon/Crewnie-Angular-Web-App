import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVideoPortfolioComponent } from './view-video-portfolio.component';

describe('ViewVideoPortfolioComponent', () => {
  let component: ViewVideoPortfolioComponent;
  let fixture: ComponentFixture<ViewVideoPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVideoPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVideoPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
