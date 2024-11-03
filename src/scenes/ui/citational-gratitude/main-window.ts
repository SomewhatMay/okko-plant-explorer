import { UIContainer } from "../ui-container";
import { Game as MainGame } from "../../game/index";
import { screenSize } from "../../../constants";
import { gratitude } from "./gratitude";

export class MainWindow extends UIContainer {
  static readonly WIDTH = 600;
  static readonly HEIGHT = 600;
  alreadyDrawn: boolean = false;

  constructor(scene: MainGame) {
    super(
      scene,
      screenSize.x / 2 - MainWindow.WIDTH / 2,
      screenSize.y / 2 - 150 - MainWindow.HEIGHT / 2
    );
    this.draw();
    this.setVisible(false);
  }

  draw() {
    this.clear();
    this.drawRoundRect(
      -screenSize.x,
      -screenSize.y,
      screenSize.x * 2,
      screenSize.y * 2,
      0x000000,
      0xffffff,
      0,
      0,
      0.5
    );
    this.drawRoundRect(
      0,
      0,
      MainWindow.WIDTH,
      MainWindow.HEIGHT,
      0xffffff,
      0x000000,
      20,
      3
    );
    this.drawText(
      MainWindow.WIDTH / 2,
      16,
      "Citational Gratitude",
      24
    ).setOrigin(0.5, 0);
    this.drawLine(32, 48, MainWindow.WIDTH - 32, 48);

    this.drawText(MainWindow.WIDTH / 2, 64, gratitude, 18).setOrigin(0.5, 0);

    this.drawText(
      MainWindow.WIDTH / 2,
      MainWindow.HEIGHT - 18 - 16,
      "Click anywhere to dismiss",
      18,
      "gray"
    ).setOrigin(0.5, 0);
  }
}
