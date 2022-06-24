import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWorkleavesComponent } from './all-workleaves.component';

describe('AllWorkleavesComponent', () => {
  let component: AllWorkleavesComponent;
  let fixture: ComponentFixture<AllWorkleavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWorkleavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWorkleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
