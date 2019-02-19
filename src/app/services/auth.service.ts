import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { projection } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.router.navigate(['c-select']);
    });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      this.router.navigate(['c-select']);
    });
  }

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

}
