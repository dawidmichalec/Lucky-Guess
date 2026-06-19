import { Container, Graphics, Text, Texture, Sprite } from 'pixi.js';

export class ModeButton extends Container {
  private base: Graphics;
  private stroke: Graphics;
  private maskShape: Graphics;
  private gradientSprite: Sprite;

  private isActive = false;

  private buttonWidth: number;
  private buttonHeight: number;
  private radius: number;

  constructor(
    public label: string,
    private onClick: () => void,
    width = 114,
    height = 60,
    radius = 40
    ) {
    super();

    this.buttonWidth = width;
    this.buttonHeight = height;
    this.radius = radius;

    // BASE
    this.base = new Graphics();

    // STROKE
    this.stroke = new Graphics();

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
        fontFamily: 'Open Sans',
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

    // ADD ORDER
    this.addChild(this.base);
    this.addChild(this.gradientSprite);
    this.addChild(this.maskShape);
    this.addChild(this.stroke);
    this.addChild(text);

    // 👇 IMPORTANT: SET INITIAL STATE AFTER BUILD
    this.setActive(false);
    }

  setActive(active: boolean) {
    this.isActive = active;

    if (this.isActive) {
        this.gradientSprite.visible = true;

        this.base
        .clear()
        .roundRect(0, 0, this.buttonWidth, this.buttonHeight, this.radius)
        .fill(0x000000);

        this.drawStroke(true);
        } else {
        this.gradientSprite.visible = false;

        this.base
        .clear()
        .roundRect(0, 0, this.buttonWidth, this.buttonHeight, this.radius)
        .fill(0xffd700);

        this.drawStroke(false);
        }
    }

  private drawInactive() {
    this.base
      .clear()
      .roundRect(0, 0, this.buttonWidth, this.buttonHeight, this.radius)
      .fill(0xffd700);
  }

  private drawStroke(active: boolean) {
    this.stroke.clear();

    this.stroke
      .roundRect(0, 0, this.buttonWidth, this.buttonHeight, this.radius)
      .stroke({
        width: active ? 6 : 3, // 🔥 FIX: grubszy stroke
        color: 0xffd700,
      });
  }
}