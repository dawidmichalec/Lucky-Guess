import { Container, Text } from 'pixi.js';
import { GAME_MODES, GameModeId } from '../game/GameMode';

export class GameUI extends Container {
  private balanceValue: Text;
  private betValue: Text;

  private multiplier10: Text;
  private multiplier20: Text;
  private multiplier100: Text;

  constructor() {
    super();

    // LABELS
    const multipliersText = new Text({
      text: 'Multiplier',
      style: {
        fontFamily: 'Anton',
        fontSize: 32,
        fill: 0xffde59,
      },
    });
    multipliersText.position.set(1160, 185);

    // MULTIPLIERS (FROM GAME MODE — tak jak chciałeś)
    this.multiplier10 = new Text({
      text: `x${GAME_MODES['1-10'].baseMultiplier}`,
      style: { fontFamily: 'Anton', fontSize: 44, fill: 0xffd700 },
    });
    this.multiplier10.position.set(1170, 240);

    this.multiplier20 = new Text({
      text: `x${GAME_MODES['1-20'].baseMultiplier}`,
      style: { fontFamily: 'Anton', fontSize: 44, fill: 0xffd700 },
    });
    this.multiplier20.position.set(1170, 330);

    this.multiplier100 = new Text({
      text: `x${GAME_MODES['1-100'].baseMultiplier}`,
      style: { fontFamily: 'Anton', fontSize: 44, fill: 0xffd700 },
    });
    this.multiplier100.position.set(1180, 420);

    // MODE LABEL
    const modeText = new Text({
      text: 'MODE',
      style: {
        fontFamily: 'Anton',
        fontSize: 32,
        fill: 0xffd700,
      },
    });
    modeText.position.set(1338, 185);

    // BALANCE
    const balanceLabel = new Text({
      text: 'BALANCE',
      style: {
        font: 'Open Sans',
        fontSize: 24,
        fontWeight: 'bold',
        fill: 0xffd700,
      },
    });
    balanceLabel.position.set(430, 665);

    this.balanceValue = new Text({
      text: '0.00',
      style: {
        font: 'Open Sans',
        fontSize: 24,
        fontWeight: 'bold',
        fill: 0xffffff,
      },
    });
    this.balanceValue.position.set(560, 665);

    // BET
    const betLabel = new Text({
      text: 'BET',
      style: {
        font: 'Open Sans',
        fontSize: 24,
        fontWeight: 'bold',
        fill: 0xffd700,
      },
    });
    betLabel.position.set(990, 665);

    this.betValue = new Text({
      text: '0.00',
      style: {
        font: 'Open Sans',
        fontSize: 24,
        fontWeight: 'bold',
        fill: 0xffffff,
      },
    });
    this.betValue.position.set(910, 665);

    // ADD
    this.addChild(
      multipliersText,
      this.multiplier10,
      this.multiplier20,
      this.multiplier100,
      modeText,
      balanceLabel,
      this.balanceValue,
      betLabel,
      this.betValue
    );
  }

  updateBalance(balance: number) {
    this.balanceValue.text = balance.toFixed(2);
  }

  updateBet(bet: number) {
    this.betValue.text = bet.toFixed(2);
  }

  updateMultipliers(mode: GameModeId) {

    this.multiplier10.text = `x${GAME_MODES['1-10'].baseMultiplier}`;
    this.multiplier20.text = `x${GAME_MODES['1-20'].baseMultiplier}`;
    this.multiplier100.text = `x${GAME_MODES['1-100'].baseMultiplier}`;
  }
}