import { TestBed } from '@angular/core/testing';

import { CrudStorageService } from './crud-storage.service';

describe('CrudStorageService', () => {
  let service: CrudStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
