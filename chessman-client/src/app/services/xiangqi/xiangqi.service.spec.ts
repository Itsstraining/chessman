import { TestBed } from '@angular/core/testing';

import { XiangqiService } from './xiangqi.service';

describe('XiangqiService', () => {
  let service: XiangqiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XiangqiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
