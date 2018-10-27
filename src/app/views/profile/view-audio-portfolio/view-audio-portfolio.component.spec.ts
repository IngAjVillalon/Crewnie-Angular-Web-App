import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAudioPortfolioComponent } from './view-audio-portfolio.component';

describe('ViewAudioPortfolioComponent', () => {
  let component: ViewAudioPortfolioComponent;
  let fixture: ComponentFixture<ViewAudioPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAudioPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAudioPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
