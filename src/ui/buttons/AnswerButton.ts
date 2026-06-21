import { Graphics, Container, Text, Sprite, Texture } from "pixi.js";

export class AnswerButton extends Container {
    private base: Graphics;
    private stroke: Graphics;
    private maskShape: Graphics;
    private gradientSprite: Sprite;

    private buttonWidth: number;
    private buttonHeight: number;
    private radius: number;

    constructor(
        public label: string,
        private onClick: () => void,
        width = 130,
        height = 80,
        radius = 40,
    ) {
        super();

        this.buttonWidth = width;
        this.buttonHeight = height;
        this.radius = radius;

        // BASE

        this.base = new Graphics();

        this.base
            .roundRect(0, 0, width, height, radius)
            .fill(0xffd700);

        // STROKE

        this.stroke = new Graphics;

        // MASK

        this.maskShape = new Graphics()
        .roundRect(0, 0, width, height, radius)
        .fill(0xffffff);

        // GRADIENT
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
    
        const ctx = canvas.getContext('2d')!;
    
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#a20cbc');
        gradient.addColorStop(1, '#0e3ebb');
    
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    
        this.gradientSprite = new Sprite(Texture.from(canvas));
        this.gradientSprite.mask = this.maskShape;
        this.gradientSprite.visible = false;

        // TEXT
        const text = new Text({
            text: label,
            style: {
            font: 'Open Sans',
            fontSize: 26,
            fontWeight: 'bold',
            fill: 0xffffff,
            },
        });

        text.anchor.set(0.5);
        text.position.set(width / 2, height / 2);

        // INPUT
        this.base.eventMode = 'static';
        this.base.cursor = 'pointer';
        this.base.on('pointertap', () => this.onClick());
        this.base.on('pointerover', () => {
        this.alpha = 0.9;
        });

        this.base.on('pointerout', () => {
        this.alpha = 1;
        });

        // ADD ORDER
        this.addChild(this.base);
        this.addChild(this.gradientSprite);
        this.addChild(this.maskShape);
        this.addChild(this.stroke);
        this.addChild(text);
    }
}