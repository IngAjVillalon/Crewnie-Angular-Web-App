import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVideoPortfolioComponent } from './update-video-portfolio.component';

describe('UpdateVideoPortfolioComponent', () => {
  let component: UpdateVideoPortfolioComponent;
  let fixture: ComponentFixture<UpdateVideoPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVideoPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVideoPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
