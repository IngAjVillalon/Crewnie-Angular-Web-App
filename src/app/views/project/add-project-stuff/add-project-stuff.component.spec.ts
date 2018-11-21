import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectStuffComponent } from './add-project-stuff.component';

describe('AddProjectStuffComponent', () => {
  let component: AddProjectStuffComponent;
  let fixture: ComponentFixture<AddProjectStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
