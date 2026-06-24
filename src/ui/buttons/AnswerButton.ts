import { Graphics, Container, Text, Sprite, Texture } from "pixi.js";

export class AnswerButton extends Container {
    private base: Graphics;
    private stroke: Graphics;
    private maskShape: Graphics;
    private gradientSprite: Sprite;
    private hoverOverlay: Graphics;

    private buttonWidth: number;
    private buttonHeight: number;
    private radius: number;

    constructor(
        public label: string,
        private onClick: () => void,
        width = 125,
        height = 90,
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
        this.gradientSprite.visible = true;

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

        // HOVER GRAPHICS

        this.hoverOverlay = new Graphics();
        this.hoverOverlay
        .roundRect(0, 0, width, height, radius)
        .fill({ color: 0xffffff, alpha: 0.15 });

        this.hoverOverlay.visible = false;

        // INPUT
        this.base.eventMode = 'static';
        this.base.cursor = 'pointer';
        this.base.on('pointertap', () => this.onClick());
        this.base.on('pointerover', () => {
            this.hoverOverlay.visible = true;
        });

        this.base.on('pointerout', () => {
            this.hoverOverlay.visible = false;
        });

        // ADD ORDER
        this.addChild(this.base);
        this.addChild(this.gradientSprite);
        this.addChild(this.maskShape);
        this.addChild(this.stroke);
        this.addChild(this.hoverOverlay);
        this.addChild(text);

        this.drawStroke();
    }

    private drawStroke() {

        this.stroke
        .roundRect(
            0,
            0,
            this.buttonWidth,
            this.buttonHeight,
            this.radius
        )
        .stroke({
            width: 4,
            color: 0x77faff,
        });
    }
}