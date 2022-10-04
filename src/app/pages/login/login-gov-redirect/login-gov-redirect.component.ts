import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-gov-redirect',
  templateUrl: './login-gov-redirect.component.html',
  styleUrls: ['./login-gov-redirect.component.scss']
})
export class LoginGovRedirectComponent implements OnInit {

  constructor(private user: UserService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const url = window.location.href;
    const splittedUrl = url.split("#");
    this.user.redirectLoginGov("?" + splittedUrl[1]).subscribe(() => {
      this.cd.detectChanges();
    });

  }

}
