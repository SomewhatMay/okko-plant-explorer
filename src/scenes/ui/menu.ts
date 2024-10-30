import { Scene } from "phaser";
import { UIContainer } from "./ui-container";
import { screenSize } from "../../constants";

export class Menu extends UIContainer {
  static readonly WIDTH = 200;

  private lineY: number;

  constructor(scene: Scene) {
    super(scene, screenSize.x / 2 - Menu.WIDTH / 2, 40);
    this.draw();
    this.setVisible(false);
  }

  draw() {
    this.clear();
    this.drawRoundRect(0, 0, Menu.WIDTH, 195);
    this.drawText(Menu.WIDTH / 2, 10, "Item:").setOrigin(0.5, 0);
    this.drawText(Menu.WIDTH / 2, 26 + 4, "?????????", 24).setOrigin(0.5, 0);
    this.drawText(Menu.WIDTH / 2, 26 + 4 + 24 + 4, "Discovered: 0%").setOrigin(
      0.5,
      0
    );

    this.lineY = 26 + 4 + 24 + 4 + 24 + 2;
    this.drawLine(16, this.lineY, Menu.WIDTH - 16, this.lineY);

    this.drawAction("[E] Observe", 0);
    this.drawAction("[F] Touch", 1);
    this.drawAction("[Q] Smell", 2);
  }

  drawAction(title: string, n: number) {
    this.drawText(Menu.WIDTH / 2, this.lineY + 8 + n * 30, title, 20).setOrigin(
      0.5,
      0
    );
  }

  update() {
    // this.draw();
  }
}
