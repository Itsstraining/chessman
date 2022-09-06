import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogwingameComponent } from './dialogwingame.component';

describe('DialogwingameComponent', () => {
  let component: DialogwingameComponent;
  let fixture: ComponentFixture<DialogwingameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogwingameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogwingameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
