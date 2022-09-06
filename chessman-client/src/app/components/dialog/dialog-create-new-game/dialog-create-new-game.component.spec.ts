import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateNewGameComponent } from './dialog-create-new-game.component';

describe('DialogCreateNewGameComponent', () => {
  let component: DialogCreateNewGameComponent;
  let fixture: ComponentFixture<DialogCreateNewGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateNewGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateNewGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
