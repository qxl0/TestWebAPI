import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScmEnvComponent } from './scm-env.component';

describe('ScmEnvComponent', () => {
  let component: ScmEnvComponent;
  let fixture: ComponentFixture<ScmEnvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScmEnvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScmEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
