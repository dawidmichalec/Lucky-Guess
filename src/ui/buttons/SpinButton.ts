import { Container, Sprite, Text, Texture, Assets, Graphics } from 'pixi.js';

export class SpinButton extends Container {
  private bg!: Sprite;

  private buttonWidth: number;
  private buttonHeight: number;

  constructor(
    public label: string,
  ) {
    super();

    this.buttonWidth = 160;
    this.buttonHeight = 160;
  }

  async init() {
    const texture = await Assets.load(
        './luckygame assets/images/icons/spin_button_graphic.png'
    );

    this.bg = new Sprite(texture);

    const scaleX = this.buttonWidth / this.bg.texture.width;
    const scaleY = this.buttonHeight / this.bg.texture.height;

    this.bg.scale.set(scaleX, scaleY);

    this.addChild(this.bg);

    const text = new Text({
        text: this.label,
        style: {
        font: 'Open Sans',
        fontSize: 36,
        fontWeight: 'bold',
        fill: 0xffffff,
        align: 'center',
        },
    });

    text.anchor.set(0.5);

    this.bg.anchor?.set?.(0.5);
    this.bg.position.set(this.buttonWidth / 2, this.buttonHeight / 2);

    text.position.set(
        this.buttonWidth / 2,
        this.buttonHeight / 2
    );

    this.addChild(text);
  }
}