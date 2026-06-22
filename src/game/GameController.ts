import { GameModeId } from './GameMode';
import { BET_LEVELS } from './BetLevels';

type ControllerConfig = {
  onBetChange: (bet: number) => void;
  onModeChange: (mode: GameModeId) => void;
  onPopup: (msg: string) => void;
};

export class GameController {
  private mode: GameModeId = '1-10';
  private betIndex = 3;

  constructor(private config: ControllerConfig) {
    this.selectMode('1-10'); 
  }

  selectMode(mode: GameModeId) {
    this.mode = mode;
    this.config.onModeChange(mode);
  }

  decreaseBet() {
    if (this.betIndex > 0) {
      this.betIndex--;
      this.syncBet();
    }
  }

  increaseBet() {
    if (this.betIndex < BET_LEVELS.length - 1) {
      this.betIndex++;
      this.syncBet();
    }
  }

  private syncBet() {
    const bet = BET_LEVELS[this.betIndex];

    this.config.onBetChange(bet);

    if (this.betIndex === 0) {
      this.config.onPopup('The minimum bet has been set');
    }

    if (this.betIndex === BET_LEVELS.length - 1) {
      this.config.onPopup('The maximum bet has been set');
    }
  }

  getMode() {
    return this.mode;
  }

  getBet() {
    return BET_LEVELS[this.betIndex];
  }
}