import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScriptPortfolioComponent } from './add-script-portfolio.component';

describe('AddScriptPortfolioComponent', () => {
  let component: AddScriptPortfolioComponent;
  let fixture: ComponentFixture<AddScriptPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScriptPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScriptPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
