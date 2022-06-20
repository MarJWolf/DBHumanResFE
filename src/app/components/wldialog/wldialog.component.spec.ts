import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WldialogComponent } from './wldialog.component';

describe('WldialogComponent', () => {
  let component: WldialogComponent;
  let fixture: ComponentFixture<WldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WldialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
