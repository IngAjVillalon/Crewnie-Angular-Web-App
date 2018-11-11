import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAudioPortfolioComponent } from './update-audio-portfolio.component';

describe('UpdateAudioPortfolioComponent', () => {
  let component: UpdateAudioPortfolioComponent;
  let fixture: ComponentFixture<UpdateAudioPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAudioPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAudioPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
