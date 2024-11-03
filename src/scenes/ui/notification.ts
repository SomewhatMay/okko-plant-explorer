import { UIContainer } from "./ui-container";
import { Game as MainGame } from "../game/index";
import { screenSize } from "../../constants";

export class Notification extends UIContainer {
  static readonly WIDTH = 400;
  static readonly HEIGHT = 50;
  static readonly PADDING = 16;

  private messageIndex = 0;

  constructor(scene: MainGame) {
    super(scene, screenSize.x, Notification.PADDING);
  }

  draw(message: string = "") {
    this.clear();

    const textObj = new Phaser.GameObjects.Text(
      this.scene,
      this.offsetX - 48,
      Notification.HEIGHT / 2 + Notification.PADDING,
      message,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "20px",
      }
    )
      .setOrigin(1, 0.5)
      .setColor("black");
    this.children.push(textObj);
    this.layer.add(textObj);

    this.drawRoundRect(
      -textObj.width - 64,
      0,
      textObj.width + 32,
      Notification.HEIGHT
    );

    // this.drawText(
    //   Notification.WIDTH / 2,
    //   Notification.HEIGHT / 2,
    //   message
    // ).setOrigin(0.5, 0.5);
  }

  displayNotification(message: string) {
    this.messageIndex++;
    const currentIndex = this.messageIndex;

    this.draw(message);
    this.setVisible(true);

    setTimeout(() => {
      if (this.messageIndex === currentIndex) {
        this.setVisible(false);
      }
    }, 5000);
  }
}
