import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryCalendarsComponent } from './secondary-calendars.component';

describe('SecondaryCalendarsComponent', () => {
  let component: SecondaryCalendarsComponent;
  let fixture: ComponentFixture<SecondaryCalendarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryCalendarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryCalendarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
