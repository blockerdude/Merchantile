import { TestBed, inject } from '@angular/core/testing';

import { InfluenceService } from './influence.service';

describe('InfluenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfluenceService]
    });
  });

  it('should be created', inject([InfluenceService], (service: InfluenceService) => {
    expect(service).toBeTruthy();
  }));
});
