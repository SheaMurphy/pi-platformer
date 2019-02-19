import { Component, OnInit } from '@angular/core';
import { CharacterService} from '../services/character.service';


@Component({
  selector: 'app-b-battle',
  templateUrl: './b-battle.component.html',
  styleUrls: ['./b-battle.component.css']
})

export class BBattleComponent implements OnInit {
  playerHealth: number;
  compHealth: number;
  endstate: string;

  constructor(  private characterService: CharacterService
    ) {
      this.playerHealth = this.characterService.playerHealth;
      this.compHealth = this.characterService.compHealth;
      this.endstate = this.characterService.endGame();
    }

  reduceHealth(attacker) {
    this.characterService.reduceHealth(attacker);
    this.playerHealth = this.characterService.playerHealth;
    this.compHealth = this.characterService.compHealth;
  }

  ngOnInit() {

  }

}
