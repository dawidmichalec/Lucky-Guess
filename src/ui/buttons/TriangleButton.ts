import { Container, Graphics, Text } from 'pixi.js';

type TriangleButtonProps = {
  direction: 'left' | 'right';
  label: string;
};

export class TriangleButton extends Container {
  constructor({ direction, label }: TriangleButtonProps) {
    super();

    const bg = new Graphics()
      .poly([
        0, 0,
        40, 20,
        0, 30
      ])
      .fill(0xffd700);

    if (direction === 'left') {
      bg.scale.x = -1;
      bg.x = 40;
    }

    const text = new Text({
      text: label,
      style: {
        fontFamily: 'Anton',
        fontSize: 58,
        fill: 0xffffff,
      }
    });
    
    if (direction === 'left') {
        text.position.set(19, -40);
    } else {
        text.position.set(1, -40);
    }
    

    this.addChild(bg);
    this.addChild(text);
  }
}