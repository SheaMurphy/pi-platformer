import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BBattleComponent } from './b-battle.component';

describe('BBattleComponent', () => {
  let component: BBattleComponent;
  let fixture: ComponentFixture<BBattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BBattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
