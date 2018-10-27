import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScriptPortfolioComponent } from './view-script-portfolio.component';

describe('ViewScriptPortfolioComponent', () => {
  let component: ViewScriptPortfolioComponent;
  let fixture: ComponentFixture<ViewScriptPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScriptPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScriptPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
