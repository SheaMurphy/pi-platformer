import { Component, OnInit, HostListener } from '@angular/core';
import { CharacterService, ICharacter } from '../services/character.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export enum KeyCode {
  rightArrow = 39,
  leftArrow = 37,
  upArrow = 38,
  space = 32
}

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
})



export class LevelComponent implements OnInit {
  avatarState = false;
  players: Observable<ICharacter[]>;

  constructor( private characterService: CharacterService) {
    this.players = this.characterService.players;
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KeyCode.rightArrow || event.keyCode === KeyCode.leftArrow || event.keyCode === KeyCode.upArrow ) {
      this.swapAvatar();
    }
  }

  swapAvatar() {
    this.avatarState = !this.avatarState;
  }

  ngOnInit() {
  }
}
