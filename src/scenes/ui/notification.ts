import { UIContainer } from "./ui-container";
import { Game as MainGame } from "../game/index";
import { screenSize } from "../../constants";

export class Notification extends UIContainer {
  static readonly WIDTH = 400;
  static readonly HEIGHT = 50;

  private messageIndex = 0;

  constructor(scene: MainGame) {
    const padding = 16;
    super(scene, screenSize.x - Notification.WIDTH - padding, padding);
  }

  draw(message: string = "") {
    this.clear();

    this.drawRoundRect(0, 0, Notification.WIDTH, Notification.HEIGHT);

    this.drawText(
      Notification.WIDTH / 2,
      Notification.HEIGHT / 2,
      message
    ).setOrigin(0.5, 0.5);
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
