import { label, text } from 'motion/react-client';
import { Application, Sprite, Assets} from 'pixi.js';
import { PopupManager } from './ui/popups/PopupManager';
import { RoundState } from './game/RoundState';
import { GameScene } from './game/GameScene';

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

    // PopupManager

    const popupManager = new PopupManager(app.screen.width, app.screen.height);

    // GameScene

    const gameScene = new GameScene(app, popupManager);

    app.stage.sortableChildren = true;

    app.stage.addChild(gameScene);
    app.stage.addChild(popupManager);

    popupManager.zIndex = 999;
    gameScene.zIndex = 1;

    // RoundState

    let roundState: RoundState = 'waitingForBet';

})();