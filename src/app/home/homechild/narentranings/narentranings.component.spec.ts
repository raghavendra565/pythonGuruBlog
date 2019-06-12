import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarentraningsComponent } from './narentranings.component';

describe('NarentraningsComponent', () => {
  let component: NarentraningsComponent;
  let fixture: ComponentFixture<NarentraningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarentraningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarentraningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
