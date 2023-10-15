/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RentCallService } from './rent-call.service';

describe('Service: RentCall', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentCallService]
    });
  });

  it('should ...', inject([RentCallService], (service: RentCallService) => {
    expect(service).toBeTruthy();
  }));
});
