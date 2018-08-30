import { TestBed, inject } from '@angular/core/testing';

import { CurdService } from './curd.service';

describe('CurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurdService]
    });
  });

  it('should be created', inject([CurdService], (service: CurdService) => {
    expect(service).toBeTruthy();
  }));
});
