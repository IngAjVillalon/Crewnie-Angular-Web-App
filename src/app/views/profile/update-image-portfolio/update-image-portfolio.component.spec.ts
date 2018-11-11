import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateImagePortfolioComponent } from './update-image-portfolio.component';

describe('UpdateImagePortfolioComponent', () => {
  let component: UpdateImagePortfolioComponent;
  let fixture: ComponentFixture<UpdateImagePortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateImagePortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateImagePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
