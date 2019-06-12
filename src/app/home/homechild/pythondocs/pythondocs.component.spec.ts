import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythondocsComponent } from './pythondocs.component';

describe('PythondocsComponent', () => {
  let component: PythondocsComponent;
  let fixture: ComponentFixture<PythondocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PythondocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PythondocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
