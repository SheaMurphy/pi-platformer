import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  register(details: { email: string, password: string}) {
    this.auth.register(details.email, details.password).
      then(() => {
        this.router.navigate(['/c-select']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  ngOnInit() {
  }

}
