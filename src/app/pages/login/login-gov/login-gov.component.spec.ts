import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGovComponent } from './login-gov.component';

describe('LoginGovComponent', () => {
  let component: LoginGovComponent;
  let fixture: ComponentFixture<LoginGovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginGovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
