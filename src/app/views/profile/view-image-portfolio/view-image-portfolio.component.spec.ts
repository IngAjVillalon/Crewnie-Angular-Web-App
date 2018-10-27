import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImagePortfolioComponent } from './view-image-portfolio.component';

describe('ViewImagePortfolioComponent', () => {
  let component: ViewImagePortfolioComponent;
  let fixture: ComponentFixture<ViewImagePortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewImagePortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewImagePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
