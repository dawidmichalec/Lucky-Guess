import { Container, Application, Assets } from 'pixi.js';

import { Player } from './Player';
import { GameUI } from '../ui/GameUI';
import { GameController } from './GameController';

import { ModeButton } from '../ui/buttons/ModeButton';
import { TriangleButton } from '../ui/buttons/TriangleButton';
import { AnswerButton } from '../ui/buttons/AnswerButton';
import { SpinButton } from '../ui/buttons/SpinButton';

import { NumberDisplay } from './NumberDisplay';
import { BET_LEVELS } from './BetLevels';
import { GameModeId, GAME_MODES } from './GameMode';

import { RoundState } from './RoundState';

export class GameScene extends Container {

  private correctAnswer: number | null = null;
  private options: number[] = [];
  private roundState: RoundState = 'waitingForBet';

  private controller: GameController;
  private gameUI: GameUI;
  private player: Player;

  private currentBetIndex = 3;
  private currentBet = 0;

  private mode10!: ModeButton;
  private mode20!: ModeButton;
  private mode100!: ModeButton;

  private answer1!: AnswerButton;
  private answer2!: AnswerButton;
  private answer3!: AnswerButton;

  private betDown!: TriangleButton;
  private betUp!: TriangleButton;

  private spinButton!: SpinButton;

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

    this.currentBet = BET_LEVELS[this.currentBetIndex];

    // CONTROLLER
    this.controller = new GameController({
        onBetChange: (bet) => {
          this.currentBet = bet;
          this.gameUI.updateBet(bet);
        },

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
    this.createAnswerButtons();
    this.createBetButtons();
    this.initNumberDisplay();

    this.createSpinButton();
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

    this.mode10.position.set(1320, 250);
    this.mode20.position.set(1320, 340);
    this.mode100.position.set(1320, 430);

    this.addChild(this.mode10, this.mode20, this.mode100);

    // DEFAULT MODE
    this.controller.selectMode('1-10');
    this.syncModeUI('1-10');
  }

  // ----------------ANSWER BUTTONS-----------------

  private createAnswerButtons() {
    this.answer1 = new AnswerButton('?', () => this.handleAnswer(0));
    this.answer2 = new AnswerButton('?', () => this.handleAnswer(1));
    this.answer3 = new AnswerButton('?', () => this.handleAnswer(2));

    this.answer1.position.set(470, 515);
    this.answer2.position.set(715, 515);
    this.answer3.position.set(955, 515);

    this.addChild(
      this.answer1,
      this.answer2,
      this.answer3
    );
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

    betDown.position.set(850, 660);
    betUp.position.set(1050, 660);

    this.betDown = betDown;
    this.betUp = betUp;

    this.addChild(betDown, betUp);
  }

  private setTriangleEnabled(enabled: boolean) {
    this.betDown.setDisabled(!enabled);
    this.betUp.setDisabled(!enabled);
  }

  // ------------ SPIN BUTTON ------------------

  private async createSpinButton() {
    this.spinButton = new SpinButton('BET');

    await this.spinButton.init();

    this.spinButton.position.set(1300, 530);

    this.spinButton.on('spin', () => {
      this.startRound();
    });

    this.addChild(this.spinButton);
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

  // --------------- SPIN LOGIC ---------------------
  
  private startRound() {
    if (this.roundState !== 'waitingForBet') return;

    this.roundState = 'waitingForAnswer';
    this.lockAfterSpin();
    this.player.addLoss(this.currentBet);

    this.gameUI.updateBalance(this.player.balance);

    // 1. lock UI

    const mode = this.controller.getMode();

    let max = 10;
    if (mode === '1-20') max = 20;
    if (mode === '1-100') max = 100;

    // 2. correct answer
    this.correctAnswer = this.randomInt(1, max);

    // 3. generate wrong answers
    const set = new Set<number>();
    set.add(this.correctAnswer);

    while (set.size < 3) {
      set.add(this.randomInt(1, max));
    }

    this.options = Array.from(set);

    // shuffle
    this.options.sort(() => Math.random() - 0.5);

    // 4. assign to buttons
    this.answer1.setLabel(String(this.options[0]));
    this.answer2.setLabel(String(this.options[1]));
    this.answer3.setLabel(String(this.options[2]));

    // 5. reset visuals
    setTimeout(() => {
      this.answer1.resetState();
      this.answer2.resetState();
      this.answer3.resetState();
    }, 1500);

    // 6. number display
    this.numberDisplay.setNumber(this.correctAnswer);
    this.numberDisplay.reset(); // pokaże "?" + animacja

    this.numberDisplay.playRollEffect();
  }

  private randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Handle Answer

  private handleAnswer(index: number) {
    if (this.roundState !== 'waitingForAnswer') return;

    const selected = this.options[index];
    const isCorrect = selected === this.correctAnswer;

    const answers = [this.answer1, this.answer2, this.answer3];

    // 1. blokada inputu (bez alpha UX kill)
    answers.forEach(btn => btn.setDisabled(true));

    // 2. zawsze pokaz correct
    answers.forEach((btn, i) => {
      if (this.options[i] === this.correctAnswer) {
        btn.setCorrect();
      }
    });

    // 3. jeśli gracz źle → tylko jego wybór czerwony
    if (!isCorrect) {
      answers[index].setWrong();
    }

    this.numberDisplay.setNumber(this.correctAnswer!);


    // 4. WYPŁATA
    if (isCorrect) {
      const mode = this.controller.getMode();
      const multiplier = GAME_MODES[mode].baseMultiplier;

      const winAmount = this.currentBet * multiplier;

      this.player.addWin(winAmount);
      this.gameUI.updateBalance(this.player.balance);
    }

    // 5. STATE TRANSITION
    this.roundState = 'roundFinished';

    // 6. RESET PO ANIMACJI
    setTimeout(() => {
      this.answer1.resetState();
      this.answer2.resetState();
      this.answer3.resetState();

      this.answer1.setLabel('?');
      this.answer2.setLabel('?');
      this.answer3.setLabel('?');

      this.numberDisplay.reset();

      this.lockBeforeSpin();
      this.roundState = 'waitingForBet';
    }, 2000);
  }

  // Lock Before Spin

  private lockBeforeSpin() {
    this.mode10.setDisabled(false);
    this.mode20.setDisabled(false);
    this.mode100.setDisabled(false);

    this.answer1.setDisabled(true);
    this.answer2.setDisabled(true);
    this.answer3.setDisabled(true);

    this.spinButton.setDisabled(false);

    this.betDown.setDisabled(false);
    this.betUp.setDisabled(false);
  }

  // Lock After Spin before answer

  private lockAfterSpin() {
    this.mode10.setDisabled(true);
    this.mode20.setDisabled(true);
    this.mode100.setDisabled(true);

    this.answer1.setDisabled(false);
    this.answer2.setDisabled(false);
    this.answer3.setDisabled(false);

    this.spinButton.setDisabled(true);

    this.betDown.setDisabled(true);
    this.betUp.setDisabled(true);

  }
}