import { TestBed } from '@angular/core/testing';

import { EditInitiatiaveService } from './edit-initiatiave.service';

describe('EditInitiatiaveService', () => {
  let service: EditInitiatiaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditInitiatiaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
