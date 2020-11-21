import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenPayload } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  isError: boolean;

  credentials: TokenPayload = {
    phone_number: null,
    password: null
  };

  constructor(private auth: AuthenticationService, private router: Router) { }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/chat");
        this.isError = false;
      },
      err => {
        console.error(err);
        this.isError = true;
      }
    );
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
