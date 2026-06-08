import { text } from 'motion/react-client';
import { Application, Container, Graphics, Text, Sprite, Assets, BlurFilter } from 'pixi.js';
import { Player } from './game/Player'
import { TriangleButton } from './ui/buttons/TriangleButton';

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
    
    //MODE Display

    const modeText = new Text({
      text: 'MODE',
      style: {
        fontFamily: 'Anton',
        fontSize: 32,
        fill: 0xffd700,
      }
    });

    modeText.position.set(1380, 185);

    app.stage.addChild(modeText);

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
      text: `${player.balance}`,
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

    const betText = new Text({
      text: 'BET',
      style: {
        font: 'Open Sans',
        fontSize: 24,
        fontWeight: 'bold',
        fill: 0xffd700,
      }
    });

    betText.x = 1050;
    betText.y = 665;

    app.stage.addChild(betText);

    // Buttons to bets

    const betDown = new TriangleButton({
      direction: 'left',
      label: '-'
    });

    betDown.position.set(900, 665);
    app.stage.addChild(betDown);

    const betUp = new TriangleButton({
      direction: 'right',
      label: '+'
    });

    betUp.position.set(1150, 665);
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

})();