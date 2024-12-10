import { TestBed } from '@angular/core/testing';

import { WebsiteListService } from './website-list.service';

describe('WebsiteListService', () => {
  let service: WebsiteListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
