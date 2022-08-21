import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxHistoryComponent } from './box-history.component';

describe('BoxHistoryComponent', () => {
  let component: BoxHistoryComponent;
  let fixture: ComponentFixture<BoxHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
