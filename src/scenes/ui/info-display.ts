import { UIContainer } from "./ui-container";
import { screenSize } from "../../constants";
import { onChanges } from "../../util";
import { Game as MainGame } from "../game/index";

export class InfoDisplay extends UIContainer {
  static readonly WIDTH = 500;

  constructor(scene: MainGame) {
    super(scene, screenSize.x / 2 - InfoDisplay.WIDTH / 2, 40);

    this.draw();
    this.setVisible(false);

    this.subscribeToEvents();
  }

  draw() {
    this.clear();
    this.drawRoundRect(0, 0, InfoDisplay.WIDTH, 195);
    this.drawText(InfoDisplay.WIDTH / 2, 10, "Observing").setOrigin(0.5, 0);
    this.drawText(InfoDisplay.WIDTH / 2, 30, "[ESC] Go Back", 12).setOrigin(
      0.5,
      0
    );

    const lineY = 10 + 18 + 4 + 12 + 6;
    this.drawLine(16, lineY, InfoDisplay.WIDTH - 16, lineY);

    const target = this.scene.registry.get("target") as string;
    const action = this.scene.registry.get("action") as string;
    (this.scene as MainGame).interactableInfo.forEach((info) => {
      if (info.title === target) {
        this.drawText(
          InfoDisplay.WIDTH / 2,
          lineY + 4,
          info[action as never]
        ).setOrigin(0.5, 0);
      }
    });
  }

  subscribeToEvents() {
    const updateVisibility = () => {
      const action = this.scene.registry.get("action");
      const target = this.scene.registry.get("target");

      this.draw();
      this.setVisible(target !== "" && action !== "");
    };

    onChanges(this.scene, "action", updateVisibility);
    onChanges(this.scene, "target", updateVisibility);
  }
}
