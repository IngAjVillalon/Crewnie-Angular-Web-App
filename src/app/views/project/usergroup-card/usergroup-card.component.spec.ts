import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupCardComponent } from './usergroup-card.component';

describe('UsergroupCardComponent', () => {
  let component: UsergroupCardComponent;
  let fixture: ComponentFixture<UsergroupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergroupCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
