import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInactiveUsersComponent } from './all-inactive-users.component';

describe('AllInactiveUsersComponent', () => {
  let component: AllInactiveUsersComponent;
  let fixture: ComponentFixture<AllInactiveUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInactiveUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInactiveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
