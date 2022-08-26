import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkleaveCalendarComponent } from './workleave-calendar.component';

describe('WorkleaveCalendarComponent', () => {
  let component: WorkleaveCalendarComponent;
  let fixture: ComponentFixture<WorkleaveCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkleaveCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkleaveCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
