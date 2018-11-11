import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAudioPortfolioComponent } from './add-audio-portfolio.component';

describe('AddAudioPortfolioComponent', () => {
  let component: AddAudioPortfolioComponent;
  let fixture: ComponentFixture<AddAudioPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAudioPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAudioPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
