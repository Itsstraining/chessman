import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacthecoComponent } from './cactheco.component';

describe('CacthecoComponent', () => {
  let component: CacthecoComponent;
  let fixture: ComponentFixture<CacthecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacthecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CacthecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
