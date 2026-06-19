import { Container, Graphics, Text } from 'pixi.js';

type PopupProps = {
  message: string;
  width: number;
  height: number;
  onClose: () => void;
};

export class Popup extends Container {
  constructor({ message, width, height, onClose }: PopupProps) {
    super();

    // BACKGROUND
    const bg = new Graphics()
      .roundRect(0, 0, width, height, 20)
      .fill(0x0e3ebb)
      .stroke({ width: 3, color: 0x7ffaff });

    this.addChild(bg);

    // TEXT
    const text = new Text({
      text: message,
      style: {
        font: 'Open Sans',
        fontSize: 22,
        fontWeight: 'bold',
        fill: 0xffd700,
        align: 'center',
      }
    });

    text.anchor.set(0.5);
    text.position.set(width / 2, height / 2 - 30);

    this.addChild(text);

    // BUTTON OK
    const button = new Graphics()
      .roundRect(0, 0, 120, 40, 10)
      .fill(0xa20cbc)
      .stroke({ width: 2, color: 0x7ffaff });

    button.position.set(width / 2 - 60, height - 70);

    button.eventMode = 'static';
    button.cursor = 'pointer';

    const buttonText = new Text({
      text: 'OK',
      style: {
        font: 'Open Sans',
        fontSize: 18,
        fill: 0xffd700,
        fontWeight: 'bold',
      }
    });

    buttonText.anchor.set(0.5);
    buttonText.position.set(60, 20);

    button.addChild(buttonText);

    button.on('pointertap', () => {
      onClose();
    });

    this.addChild(button);
  }
}