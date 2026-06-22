import { Container, Sprite, Text, Texture } from 'pixi.js';

export class NumberDisplay extends Container {
  private bg: Sprite;
  private text: Text;

  private currentValue: number | null = null;

  constructor(texture: Texture) {
    super();

    // background block
    this.bg = new Sprite(texture);
    this.bg.width = 135;
    this.bg.height = 150;

    // number text
    this.text = new Text({
      text: '?',
      style: {
        fontFamily: 'Open Sans',
        fontSize: 110,
        fontWeight: 'bold',
        fill: 0xffffff,
      },
    });

    this.text.anchor.set(0.5);
    this.text.position.set(67, 75);

    this.addChild(this.bg);
    this.addChild(this.text);

    this.startIdleAnimation();
  }

  setNumber(value: number) {
    this.currentValue = value;
    this.text.text = String(value);
  }

  reset() {
    this.currentValue = null;
    this.text.text = '?';
  }

  // lekkie bujanie
  private startIdleAnimation() {
    let t = 0;

    const animate = () => {
      t += 0.05;

      this.rotation = Math.sin(t) * 0.03;
      this.scale.set(1 + Math.sin(t * 0.5) * 0.02);

      requestAnimationFrame(animate);
    };

    animate();
  }

  playRollEffect() {
    let spins = 0;

    const interval = setInterval(() => {
      this.text.text = this.randomChar();

      spins++;

      if (spins > 10) {
        clearInterval(interval);
        if (this.currentValue !== null) {
          this.text.text = String(this.currentValue);
        } else {
          this.text.text = '?';
        }
      }
    }, 60);
  }

  private randomChar() {
    return String(Math.floor(Math.random() * 10));
  }
}