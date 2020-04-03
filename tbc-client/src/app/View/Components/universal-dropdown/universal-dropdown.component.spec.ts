import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalDropDownComponent } from './universal-dropdown.component';

describe('UniversalDropDownComponent', () => {
  let component: UniversalDropDownComponent;
  let fixture: ComponentFixture<UniversalDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
