import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CSelectComponent } from './c-select/c-select.component';
import { BBattleComponent } from './b-battle/b-battle.component';
import { LevelComponent } from './level/level.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CloudComponent } from './cloud/cloud.component';
import { BushComponent } from './bush/bush.component';
import { GameboardComponent } from './gameboard/gameboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CSelectComponent,
    BBattleComponent,
    LevelComponent,
    LayoutComponent,
    RegisterComponent,
    CloudComponent,
    BushComponent,
    GameboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'level', component: LevelComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'b-battle', component: BBattleComponent },
      { path: 'c-select', component: CSelectComponent },
      { path: '', component: LoginComponent },
      { path: 'gameboard', component: GameboardComponent },
    ])
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
