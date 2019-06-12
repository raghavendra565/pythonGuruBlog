import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSpecificArticlesComponent } from './language-specific-articles.component';

describe('LanguageSpecificArticlesComponent', () => {
  let component: LanguageSpecificArticlesComponent;
  let fixture: ComponentFixture<LanguageSpecificArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageSpecificArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSpecificArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
