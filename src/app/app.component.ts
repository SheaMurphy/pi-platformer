import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pi-project';
  items: Observable<{}[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }

}