import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalFieldComponent } from './universal-field.component';

describe('UniversalFieldComponent', () => {
  let component: UniversalFieldComponent;
  let fixture: ComponentFixture<UniversalFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
