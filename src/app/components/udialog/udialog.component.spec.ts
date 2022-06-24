import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdialogComponent } from './udialog.component';

describe('UdialogComponent', () => {
  let component: UdialogComponent;
  let fixture: ComponentFixture<UdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
