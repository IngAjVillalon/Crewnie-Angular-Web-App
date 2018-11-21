import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectUsergroupComponent } from './add-project-usergroup.component';

describe('AddProjectUsergroupComponent', () => {
  let component: AddProjectUsergroupComponent;
  let fixture: ComponentFixture<AddProjectUsergroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectUsergroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectUsergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
