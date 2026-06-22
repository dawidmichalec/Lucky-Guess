import { Container, Application, Assets } from 'pixi.js';

import { Player } from './Player';
import { GameUI } from '../ui/GameUI';
import { GameController } from './GameController';

import { ModeButton } from '../ui/buttons/ModeButton';
import { TriangleButton } from '../ui/buttons/TriangleButton';

import { NumberDisplay } from './NumberDisplay';
import { BET_LEVELS } from './BetLevels';
import { GameModeId } from './GameMode';

export class GameScene extends Container {
  private controller: GameController;
  private gameUI: GameUI;
  private player: Player;

  private currentBetIndex = 3;

  private mode10!: ModeButton;
  private mode20!: ModeButton;
  private mode100!: ModeButton;

  private numberDisplay!: NumberDisplay;

  constructor(
    private app: Application,
    private popupManager: { show: (msg: string) => void }
  ) {
    super();

    this.sortableChildren = true;

    // PLAYER
    this.player = new Player(10000);

    // UI
    this.gameUI = new GameUI();
    this.addChild(this.gameUI);

    this.gameUI.updateBalance(this.player.balance);
    this.gameUI.updateBet(BET_LEVELS[this.currentBetIndex]);

    // CONTROLLER
    this.controller = new GameController({
        onBetChange: (bet) => this.gameUI.updateBet(bet),

        onModeChange: (mode) => {
            this.syncModeUI(mode);
        },

        onPopup: (msg) => {
            console.log('POPUP TRIGGER:', msg);
            this.popupManager.show(msg);
        },
    });

    // BUILD SCENE
    this.createModeButtons();
    this.createBetButtons();
    this.initNumberDisplay();
  }

  // ---------------- MODE BUTTONS ----------------

  private createModeButtons() {
    this.mode10 = new ModeButton('1 - 10', () =>
      this.controller.selectMode('1-10')
    );

    this.mode20 = new ModeButton('1 - 20', () =>
      this.controller.selectMode('1-20')
    );

    this.mode100 = new ModeButton('1 - 100', () =>
      this.controller.selectMode('1-100')
    );

    this.mode10.position.set(1380, 250);
    this.mode20.position.set(1380, 340);
    this.mode100.position.set(1380, 430);

    this.addChild(this.mode10, this.mode20, this.mode100);

    // DEFAULT MODE
    this.controller.selectMode('1-10');
    this.syncModeUI('1-10');
  }

  private syncModeUI(mode: GameModeId) {
    if (!this.mode10) return;

    this.mode10.setActive(mode === '1-10');
    this.mode20.setActive(mode === '1-20');
    this.mode100.setActive(mode === '1-100');
  }

  // ---------------- BET BUTTONS ----------------

  private createBetButtons() {
    const betDown = new TriangleButton({
        direction: 'left',
        label: '-',
        onClick: () => {
        this.controller.decreaseBet();
        },
    });

    const betUp = new TriangleButton({
        direction: 'right',
        label: '+',
        onClick: () => {
        this.controller.increaseBet();
        },
    });

    betDown.position.set(920, 660);
    betUp.position.set(1120, 660);

    this.addChild(betDown, betUp);
  }

  // ---------------- NUMBER DISPLAY ----------------

  private async initNumberDisplay() {
    const texture = await Assets.load(
      './luckygame assets/images/block for a number.png'
    );

    this.numberDisplay = new NumberDisplay(texture);
    this.numberDisplay.position.set(710, 325);

    this.addChild(this.numberDisplay);
  }
}