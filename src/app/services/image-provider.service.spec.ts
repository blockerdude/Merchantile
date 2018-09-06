import { TestBed, inject } from '@angular/core/testing';

import { ImageProviderService } from './image-provider.service';

describe('ImageProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageProviderService]
    });
  });

  it('should be created', inject([ImageProviderService], (service: ImageProviderService) => {
    expect(service).toBeTruthy();
  }));
});
