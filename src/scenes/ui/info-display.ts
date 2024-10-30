import { Scene } from "phaser";
import { UIContainer } from "./ui-container";
import { screenSize } from "../../constants";
import { onChanges } from "../../util";

export class InfoDisplay extends UIContainer {
  static readonly WIDTH = 200;

  constructor(scene: Scene) {
    super(scene, screenSize.x / 2 - InfoDisplay.WIDTH / 2, 40);

    this.draw();
    this.setVisible(false);

    this.subscribeToEvents();
  }

  draw() {
    this.clear();
    this.drawRoundRect(0, 0, InfoDisplay.WIDTH, 195);
    this.drawText(
      InfoDisplay.WIDTH / 2,
      10,
      "You observe the item..."
    ).setOrigin(0.5, 0);
  }

  subscribeToEvents() {
    const updateVisibility = () => {
      const action = this.scene.registry.get("action");
      const target = this.scene.registry.get("target");

      this.setVisible(target !== "" && action !== "");
    };

    onChanges(this.scene, "action", updateVisibility);
    onChanges(this.scene, "target", updateVisibility);
  }
}
