import { text } from 'motion/react-client';
import { Application, Container, Graphics, Text, Sprite, Assets, BlurFilter } from 'pixi.js';

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

})();