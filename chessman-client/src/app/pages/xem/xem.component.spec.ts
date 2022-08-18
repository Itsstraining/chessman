import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemComponent } from './xem.component';

describe('XemComponent', () => {
  let component: XemComponent;
  let fixture: ComponentFixture<XemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
