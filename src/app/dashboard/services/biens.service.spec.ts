/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BiensService } from './biens.service';

describe('Service: Biens', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiensService]
    });
  });

  it('should ...', inject([BiensService], (service: BiensService) => {
    expect(service).toBeTruthy();
  }));
});
