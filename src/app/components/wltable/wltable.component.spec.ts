import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WLtableComponent } from './wltable.component';

describe('WLtableComponent', () => {
  let component: WLtableComponent;
  let fixture: ComponentFixture<WLtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WLtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WLtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
