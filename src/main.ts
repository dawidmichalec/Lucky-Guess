import { label, text } from 'motion/react-client';
import { Application, Container, Graphics, Text, Sprite, Assets, BlurFilter } from 'pixi.js';
import { Player } from './game/Player'
import { TriangleButton } from './ui/buttons/TriangleButton';
import { ModeButton } from './ui/buttons/ModeButton';
import { GAME_MODES, GameModeId } from './game/GameMode';
import { BET_LEVELS } from './game/BetLevels';
import { PopupManager } from './ui/popups/PopupManager';
import { RoundState } from './game/RoundState';
import { AnswerButton } from './ui/buttons/AnswerButton';

(async () => {
    const app = new Application();

    await app.init({
        background: '#0f0f0f',
        width: window.innerWidth,
        height: window.innerHeight,
    });

    document.body.appendChild(app.canvas);

    app.canvas.style.position = 'fixed';
    app.canvas.style.top = '0';
    app.canvas.style.left = '0';

    const backgroundImage = await Assets.load('./luckygame assets/images/luckyguess background.png');
    const background = new Sprite(backgroundImage);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);

    // Font Face

    const font = new FontFace( 'Anton', 'url(/fonts/Anton-Regular.ttf)' ); 
    await font.load(); 
    document.fonts.add(font); 
    await document.fonts.ready;

    // RoundState

    let roundState: RoundState = 'waitingForBet';

    // Mulitpliers Display

    const multipliersText = new Text({
      text: 'Multiplier',
      style: {
        fontFamily: 'Anton',
        fontSize: 32,
        fill: 0xffde59,
      }
    });

    multipliersText.x = 1150;
    multipliersText.y = 185;

    app.stage.addChild(multipliersText);

    const multiplier10ModeText = new Text({
      text: 'x0.95',
      style: {
        fontFamily: 'Anton',
        fontSize: 44,
        fill: 0xffd700,
      }
    });

    multiplier10ModeText.position.set(1160, 240);
    app.stage.addChild(multiplier10ModeText);

    const multiplier20ModeText = new Text ({
      text: 'x1.95',
      style: {
        fontFamily: 'Anton',
        fontSize: 44,
        fill: 0xffd700,
      }
    })

    multiplier20ModeText.position.set(1160, 330);
    app.stage.addChild(multiplier20ModeText);

    const multiplier100ModeText = new Text ({
      text: 'x95',
      style: {
        fontFamily: 'Anton',
        fontSize: 44,
        fill: 0xffd700,
      }
    });

    multiplier100ModeText.position.set(1170, 420);
    app.stage.addChild(multiplier100ModeText);
    
    //MODE Display

    const modeText = new Text({
      text: 'MODE',
      style: {
        fontFamily: 'Anton',
        fontSize: 32,
        fill: 0xffd700,
      }
    });

    modeText.position.set(1398, 185);

    app.stage.addChild(modeText);

    // Mode Buttons
    let selectedMode: GameModeId = '1-10';

    const mode10Button = new ModeButton('1 - 10', () => selectMode('1-10', mode10Button));
    const mode20Button = new ModeButton('1 - 20', () => selectMode('1-20', mode20Button));
    const mode100Button = new ModeButton('1 - 100', () => selectMode('1-100', mode100Button));
    
    mode10Button.position.set(1380, 250);
    app.stage.addChild(mode10Button);

    mode20Button.position.set(1380, 340);
    app.stage.addChild(mode20Button);

    mode100Button.position.set(1380, 430);
    app.stage.addChild(mode100Button);


    function selectMode(mode: GameModeId, button: ModeButton) {

      selectedMode = mode;

      mode10Button.setActive(false);
      mode20Button.setActive(false);
      mode100Button.setActive(false);

      button.setActive(true);
    }

    selectMode('1-10', mode10Button);

    // BALANCE Text

    const balanceWordText = new Text({
      text: 'BALANCE',
      style: {
        font: 'Open Sans',
        fontSize: '24',
        fontWeight: 'bold',
        fill: 0xffd700,
      }
    });

    balanceWordText.x = 430;
    balanceWordText.y = 665;

    app.stage.addChild(balanceWordText);

    // Creating Player class

    const player = new Player(10000);

    // Current balance value text

    const currentBalanceValue = new Text({
      text: `${player.balance.toFixed(2)}`,
      style: {
        font: 'Open Sans',
        fontSize: '24',
        fontWeight: 'bold',
        fill: 0xffffff,
      }
    })

    currentBalanceValue.position.set(560, 665);

    app.stage.addChild(currentBalanceValue);

    // BET Text

    let currentBetIndex = 3;
    const currentBet = BET_LEVELS[currentBetIndex];

    const betValueText = new Text({
      text: `${currentBet.toFixed(2)}`,
      style: {
        font: 'Open Sans',
        fontSize: 24,
        fontWeight: 'bold',
        fill: 0xffffff,
      }
    });

    betValueText.position.set(980, 665);
    app.stage.addChild(betValueText);

    function decreaseBet() {
      if (currentBetIndex > 0) {
        currentBetIndex--;
        updateBet();
      }
    }

    function increaseBet() {
      if (currentBetIndex < BET_LEVELS.length - 1) {
        currentBetIndex++;
        updateBet();
      }
    }

    // update bet value text

    function updateBet() {
      const bet = BET_LEVELS[currentBetIndex];
      betValueText.text = bet.toFixed(2);

      if (currentBetIndex === 0) {
        popupManager.show('The minimum bet has been set');
      }

      if (currentBetIndex === BET_LEVELS.length - 1) {
        popupManager.show('The maximum bet has been set');
      }
    }

    const betText = new Text({
      text: 'BET',
      style: {
        font: 'Open Sans',
        fontSize: 24,
        fontWeight: 'bold',
        fill: 0xffd700,
      }
    });

    betText.position.set(1060, 665);
    app.stage.addChild(betText);

    // Buttons to bets

    const betDown = new TriangleButton({
      direction: 'left',
      label: '-',
      onClick: decreaseBet,
    });

    betDown.position.set(920, 660);
    app.stage.addChild(betDown);

    const betUp = new TriangleButton({
      direction: 'right',
      label: '+',
      onClick: increaseBet,
    });

    betUp.position.set(1120, 660);
    app.stage.addChild(betUp);

    // Container for the block for a number and a number to guess

    const blockForANumberContainer = new Container();
    blockForANumberContainer.position.set(710, 325);

    // block for a number

    const blockForANumberImage = await Assets.load('./luckygame assets/images/block for a number.png');
    const blockForANumber = new Sprite(blockForANumberImage);
    blockForANumber.width = 135;
    blockForANumber.height = 150;
    blockForANumber.position.set(0, 0);

    // numberToGuess

    let numberToGuess;
    const numberToGuessText = new Text({
      text: '?',
      style: {
        font: 'Open Sans',
        fontSize: 110,
        fontWeight: 'bold',
        fill: 0xffffff,
      }
    });

    numberToGuessText.position.set(33, 10);

    // Add to Container
    
    blockForANumberContainer.addChild(blockForANumber);
    blockForANumberContainer.addChild(numberToGuessText);

    app.stage.addChild(blockForANumberContainer);

    // Answer Buttons

    

    // PopupManager

    const popupManager = new PopupManager(app.screen.width, app.screen.height);
    app.stage.addChild(popupManager);

})();