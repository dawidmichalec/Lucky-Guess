import { text } from 'motion/react-client';
import { Application, Container, Graphics, Text, Sprite, Assets } from 'pixi.js';

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

    const texture = await Assets.load('./luckygame assets/images/luckyguess background.png');
    const background = new Sprite(texture);
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);
    
})();