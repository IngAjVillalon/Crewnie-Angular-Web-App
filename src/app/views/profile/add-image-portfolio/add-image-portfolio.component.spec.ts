import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagePortfolioComponent } from './add-image-portfolio.component';

describe('AddImagePortfolioComponent', () => {
  let component: AddImagePortfolioComponent;
  let fixture: ComponentFixture<AddImagePortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImagePortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImagePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
