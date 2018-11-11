import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScriptPortfolioComponent } from './update-script-portfolio.component';

describe('UpdateScriptPortfolioComponent', () => {
  let component: UpdateScriptPortfolioComponent;
  let fixture: ComponentFixture<UpdateScriptPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateScriptPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScriptPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
