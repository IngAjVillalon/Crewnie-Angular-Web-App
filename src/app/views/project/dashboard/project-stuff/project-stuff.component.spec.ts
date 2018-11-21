import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStuffComponent } from './project-stuff.component';

describe('ProjectStuffComponent', () => {
  let component: ProjectStuffComponent;
  let fixture: ComponentFixture<ProjectStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
