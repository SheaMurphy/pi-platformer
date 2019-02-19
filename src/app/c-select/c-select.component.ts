import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NullInjector } from '@angular/core/src/di/injector';
import { CharacterService, ICharacter } from '../services/character.service';


@Component({
  selector: 'app-c-select',
  templateUrl: './c-select.component.html',
  styleUrls: ['./c-select.component.css']
})
export class CSelectComponent implements OnInit {

  hideCss = false;
  hideHtml = false;
  hideJs = false;
  characterSelected = false;
  chChoice: string;

  constructor(
    private router: Router,
    private character: CharacterService
  ) { }

  hideOthers(choice: string) {
    if (choice === 'css') {
      this.hideHtml = true;
      this.hideJs = true;
    } else if (choice === 'html') {
      this.hideCss = true;
      this.hideJs = true;
    } else if (choice === 'js') {
      this.hideHtml = true;
      this.hideCss = true;
    }
  }

  chSelect(choice: string) {
    this.characterSelected = !this.characterSelected;
    this.hideOthers(choice);
    this.chChoice = choice;
  }

  createEntry(name: string) {
    const playerSettings: ICharacter = {
      health: 100,
      playerName: name,
      selection: this.chChoice
    };
    this.character.createEntry(playerSettings);
  }

  swapCh() {
    this.hideCss = false;
    this.hideHtml = false;
    this.hideJs = false;
    this.characterSelected = !this.characterSelected;
  }

  ngOnInit() {
  }

}
