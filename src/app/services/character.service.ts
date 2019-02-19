import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { all } from 'q';

export interface ICharacter {
  health: number;
  playerName: string;
  selection: string;
}

export interface ICharacterID extends ICharacter {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  // playerCollection: AngularFirestoreCollection<ICharacter>;
  // players: Observable<ICharacter[]>;

  health: number;
  name: string;
  character: ICharacter;
  playerHealth = 100;
  compHealth = 100;
  public selection;

  constructor(
    private afs: AngularFirestore,
    private router: Router
    ) {
      this.selection = 'html';
  }

  get playerCollection(): AngularFirestoreCollection<ICharacter> {
    return this.afs.collection('players');
  }

  get players(): Observable<ICharacterID[]> {
    return this.playerCollection.snapshotChanges()
    .pipe(map(this.includeCollectionID));
  }

  includeCollectionID(docChangeAction) {
    return docChangeAction.map((a) => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    });
  }

  createEntry(playerSettings: ICharacter) {
    this.wipeData().then(() => {
      this.playerCollection.add(playerSettings).then(() => {
        this.router.navigate(['gameboard']);
      });
    });
    this.selection = playerSettings.selection;
  }

  wipeData() {
    return this.playerCollection.get().toPromise()
    .then((players) => {
        players.forEach((player) => {
          player.ref.delete();
        });
      });
      // .unsubscribe();
  }

  endGame(): string {
    if (this.playerHealth === 0) {
      return 'player end';
    } else if (this.compHealth === 0) {
      return 'comp end';
    }
    return 'unfinished';
  }

  reduceHealth(attacker: string) {
    if (attacker === 'player' && this.endGame() === 'unfinished') {
      this.compHealth -= 10;
    } else if (attacker === 'comp' && this.endGame() === 'unfinished') {
      this.playerHealth -= 10;
    }
  }
}
