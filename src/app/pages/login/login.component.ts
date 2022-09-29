import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // creates a reference to the first input element
  @ViewChild('usernameEle', { static: true }) private usernameElement: ElementRef;

  // shows and hides the password
  hide: boolean;

  // shows loading spinner while waiting
  loginLoading: boolean;

  // login form
  loginForm: FormGroup;

  constructor(
    private user: UserService,
    private cd: ChangeDetectorRef
  ) {
    this.hide = true;
    this.loginLoading = false;

    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
    // focus the first input when the page is loaded
    this.usernameElement.nativeElement.focus();
  }

  // performs a login with the given data
  login(): void {
    this.loginLoading = true;

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.user.loginGov()
      .subscribe(() => {
        this.loginLoading = false;
        this.cd.detectChanges();
      });
  }
}
