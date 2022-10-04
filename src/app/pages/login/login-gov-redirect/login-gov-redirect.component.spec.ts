import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGovRedirectComponent } from './login-gov-redirect.component';

describe('LoginGovRedirectComponent', () => {
  let component: LoginGovRedirectComponent;
  let fixture: ComponentFixture<LoginGovRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginGovRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGovRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
