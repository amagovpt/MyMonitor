import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';

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

    if (_.trim(confirmPassword) === '') {
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
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  passwordForm: FormGroup;
  matcher: ErrorStateMatcher;

  constructor(
    private monitor: MonitorService,
    private message: MessageService,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, { validator: PasswordValidation.MatchPassword });
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
  }

  changePassword(e): void {
    e.preventDefault();

    const password = this.passwordForm.value.currentPassword;
    const newPassword = this.passwordForm.value.newPassword;
    const confirmPassword = this.passwordForm.value.confirmPassword;

    this.monitor.changePassword(password, newPassword, confirmPassword)
      .subscribe(success => {
        console.log(success)
        if (success !== null) {
          this.passwordForm.reset();
          this.passwordForm.setErrors(null);
          this.message.show('SETTINGS.change_password.success');
        }
      });
  }
}
