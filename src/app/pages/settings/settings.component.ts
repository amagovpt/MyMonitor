import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { MonitorService } from '../../services/monitor.service';
import { MessageService } from '../../services/message.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('newPassword').value;
    const confirmPassword = AC.get('confirmPassword').value;
    
    if (confirmPassword && confirmPassword.trim() === '') {
      return null;
    }

    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    }

    return null;
  }
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  loading: boolean;
  passwordForm: FormGroup;
  matcher: ErrorStateMatcher;

  constructor(
    private monitor: MonitorService,
    private message: MessageService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, passwordValidator]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validator: PasswordValidation.MatchPassword });
    this.matcher = new MyErrorStateMatcher();
    this.loading = false;
  }

  ngOnInit(): void {
  }

  changePassword(e): void {
    e.preventDefault();

    this.loading = true;

    const password = this.passwordForm.value.currentPassword;
    const newPassword = this.passwordForm.value.newPassword;
    const confirmPassword = this.passwordForm.value.confirmPassword;

    this.monitor.changePassword(password, newPassword, confirmPassword)
      .subscribe(success => {
        if (success !== null) {
          this.passwordForm.reset();
          this.passwordForm.setErrors(null);
          this.message.show('SETTINGS.change_password.success');
        }
        this.loading = false;
        this.cd.detectChanges();
      });
  }
}

function passwordValidator(control: FormControl): ValidationErrors | null {
  try {
    const password = control.value;

    if (password.length > 0) {
      const errors = {};
      const isShort = password.length < 8;

      if (isShort) {
        errors['isShort'] = true;
      }

      const hasUpperCase = password.toLowerCase() !== password;

      if (!hasUpperCase) {
        errors['doesNotHaveUpperCase'] = true;
      }

      const hasLowerCase = password.toUpperCase() !== password;

      if (!hasLowerCase) {
        errors['doesNotHaveLowerCase'] = true;
      }

      const specialFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      const hasSpecial = specialFormat.test(password);

      if (!hasSpecial) {
        errors['doesNotHaveSpecial'] = true;
      }

      const numberFormat = /\d/g;
      const hasNumber = numberFormat.test(password);

      if (!hasNumber) {
        errors['doesNotHaveNumber'] = true;
      }

      if (Object.keys(errors).length > 0) {
        return errors;
      }
    }
  } catch(err) {
    console.log(err);
  }

  return null;
}