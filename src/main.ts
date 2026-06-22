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
import { GameUI } from './ui/GameUI';
import { GameController } from './game/GameController';

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

    // GameUI

    let currentBetIndex = 3;

    const player = new Player(10000);
    
    const currentBet = BET_LEVELS[currentBetIndex];

    const gameUI = new GameUI();
    gameUI.updateBalance(player.balance);
    gameUI.updateBet(BET_LEVELS[currentBetIndex]);

    app.stage.addChild(gameUI);

    // Mode Buttons

    const mode10Button = new ModeButton('1 - 10', () => controller.selectMode('1-10'));
    const mode20Button = new ModeButton('1 - 20', () => controller.selectMode('1-20'));
    const mode100Button = new ModeButton('1 - 100', () => controller.selectMode('1-100'));
    
    mode10Button.position.set(1380, 250);
    app.stage.addChild(mode10Button);

    mode20Button.position.set(1380, 340);
    app.stage.addChild(mode20Button);

    mode100Button.position.set(1380, 430);
    app.stage.addChild(mode100Button);

    // GameController

    const controller = new GameController({
      onBetChange: (bet) => gameUI.updateBet(bet),
      onModeChange: (mode) => {
        mode10Button.setActive(mode === '1-10');
        mode20Button.setActive(mode === '1-20');
        mode100Button.setActive(mode === '1-100');
      },
      onPopup: (msg) => popupManager.show(msg),
    });

    // RoundState

    let roundState: RoundState = 'waitingForBet';

    // Buttons to bets

    const betDown = new TriangleButton({
      direction: 'left',
      label: '-',
      onClick: () => controller.decreaseBet(),
    });

    betDown.position.set(920, 660);
    app.stage.addChild(betDown);

    const betUp = new TriangleButton({
      direction: 'right',
      label: '+',
      onClick: () => controller.increaseBet(),
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