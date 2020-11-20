import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenPayload } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    phone_number: null,
    password: null
  };

  constructor(private auth: AuthenticationService, private router: Router) { }

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/chat");
      },
      err => {
        console.error(err);
      }
    );
  }

}
