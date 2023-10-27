import { TestBed, inject } from '@angular/core/testing';
import { SharedCodeAuthGuard } from './shared-code-auth.guard';

describe('UserAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedCodeAuthGuard]
    });
  });

  it('should ...', inject([SharedCodeAuthGuard], (guard: SharedCodeAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
