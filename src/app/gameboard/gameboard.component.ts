import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterService, ICharacter } from '../services/character.service';

export enum KEY_CODE {
  right = 39,
  up = 38,
  left = 37,
  space = 32
}

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})

export class GameboardComponent implements OnInit {
  board = new Board;
  character = new Character(this.board, this.characterService);
  // gameOver = true;
  players: Observable<ICharacter[]>;
  public selection = this.characterService.selection;

  constructor(private characterService: CharacterService) {
    this.players = this.characterService.players;
  }

  ngOnInit() {
  }

  refresh() {
    window.location.reload();
  }

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.up) {
      this.character.jump();
    } else if (event.keyCode === KEY_CODE.right) {
      this.character.moveRight();
    } else if (event.keyCode === KEY_CODE.left) {
      this.character.moveLeft();
    }
  }
}

class Block {
  color = 'transparent';
  class = '';
  isSolid = false;
  position = {
    x: 0,
    y: 0
  };

  constructor(protected gameboard = null) {
  }
}

class Grass extends Block {
  color = 'green';
  class = '';
  isSolid = true;
}

class Spike extends Block {
  color = 'red';
  isSolid = true;
  isHarmful = true;
}

class GravityBlock extends Block {
  isVisible = true;
  fall() {
    setTimeout(() => {
      if (this.canFall()) {
        this.position.y++;
        this.fall();
      }
    }, 100);
  }

  canFall() {
    if (this.position.y === 9) {
      return false;
    }
    const squareBelow = this.gameboard.getBlock(this.position.x, this.position.y + 1);
    return !squareBelow.isSolid;
  }

  constructor(protected gameBoard) {
    super(gameBoard);
    this.fall();
  }
}

class Character extends GravityBlock {

  constructor(
    protected gameBoard,
    private characterService: CharacterService) {
    super(gameBoard);
  }

  position = {
    x: 0,
    y: 0
  };

  public health = 100;

  image = '/assets/images/' + this.characterService.selection + '-closed.png';

  public removeHealth() {
    this.health -= 20;
    this.position = {
      x: 0,
      y: 0
    };
    this.fall();
  }

  canMoveRight() {
    if (this.position.x < 14) {
      const nextSquare = this.gameBoard.getBlock(this.position.x + 1, this.position.y);
      if (nextSquare.isHarmful) {
        this.removeHealth();
      }
      return !nextSquare.isSolid;
    }
    return false;
  }

  canMoveLeft() {
    if (this.position.x === 0) {
      return false;
    }
    const nextSquare = this.gameBoard.getBlock(this.position.x - 1, this.position.y);
    if (nextSquare.isHarmful) {
      this.removeHealth();
    }
    return !nextSquare.isSolid;
  }

  canJump() {
    
  }

  moveRight() {
    if (this.canMoveRight()) {
      this.position.x += 1;
      this.fall();
    }
    this.image = '/assets/images/' + this.characterService.selection + '-open.png';
    setTimeout(() => {
      this.image = '/assets/images/' + this.characterService.selection + '-closed.png';
    }, 100);
  }

  moveLeft() {
    if (this.canMoveLeft()) {
      this.position.x -= 1;
      this.fall();
    }
  }

  jump() {
    if (this.position.y > 0) {
      this.position.y--;
      setTimeout(() => {
        this.fall();
      }, 150);
      this.image = '/assets/images/' + this.characterService.selection + '-open.png';
      setTimeout(() => {
        this.image = '/assets/images/' + this.characterService.selection + '-closed.png';
      }, 100);
    }
  }
}

export class Board {
  grid = [
    [new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Grass, new Block, new Block, new Block, new Block, new Block, new Block],
    [new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Grass, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [new Block, new Block, new Block, new Block, new Block, new Grass, new Grass, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Grass, new Block, new Block, new Block, new Block, new Block],
    [new Block, new Block, new Block, new Block, new Grass, new Grass, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [new Block, new Block, new Block, new Grass, new Block, new Block, new Grass, new Grass, new Block, new Block, new Grass, new Grass, new Grass, new Block, new Block],
    [new Block, new Block, new Grass, new Grass, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block, new Block],
    [new Block, new Grass, new Grass, new Block, new Block, new Block, new Block, new Block, new Grass, new Grass, new Block, new Block, new Block, new Block, new Block],
    [new Block, new Block, new Block, new Spike, new Block, new Block, new Block, new Block, new Grass, new Block, new Block, new Block, new Block, new Block, new Spike],
  ];

  getBlock(x: number, y: number) {
    return this.grid[y][x];
  }

  constructor() { }

}
