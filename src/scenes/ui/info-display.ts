import { Scene } from "phaser";
import { UIContainer } from "./ui-container";
import { screenSize } from "../../constants";

export class InfoDisplay extends UIContainer {
  static readonly WIDTH = 200;

  constructor(scene: Scene) {
    super(scene, screenSize.x / 2 - InfoDisplay.WIDTH / 2, 40);
  }

  draw() {
    this.clear();
    this.drawRoundRect(0, 0, InfoDisplay.WIDTH, 195);
    this.drawText(InfoDisplay.WIDTH / 2, 10, "Info:").setOrigin(0.5, 0);
    this.drawText(InfoDisplay.WIDTH / 2, 26 + 4, "?????????", 24).setOrigin(
      0.5,
      0
    );
    this.drawText(
      InfoDisplay.WIDTH / 2,
      26 + 4 + 24 + 4,
      "Discovered: 0%"
    ).setOrigin(0.5, 0);
  }
}
