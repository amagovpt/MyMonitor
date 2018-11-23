import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthErrorDialogComponent } from './user-auth-error-dialog.component';

describe('UserAuthErrorDialogComponent', () => {
  let component: UserAuthErrorDialogComponent;
  let fixture: ComponentFixture<UserAuthErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
