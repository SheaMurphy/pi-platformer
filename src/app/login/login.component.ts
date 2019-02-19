import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login(details: {email: string, password: string}) {
    this.auth.login(details.email, details.password).
      then(() => {
        this.router.navigate(['/c-select']);
      })
      .catch((error) => {
        this.errorMessage = error;
      });
  }

  ngOnInit() {
  }

}
