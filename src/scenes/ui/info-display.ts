import { UIContainer } from "./ui-container";
import { screenSize } from "../../constants";
import { Game as MainGame } from "../game/index";
import { Store } from "../game/store";

export class InfoDisplay extends UIContainer {
  static readonly WIDTH = 500;

  constructor(
    scene: MainGame,
    private store: Store
  ) {
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

    if (target !== "" && action !== "") {
      this.drawText(
        InfoDisplay.WIDTH / 2,
        lineY + 4,
        (this.store.getInfo(target) as never)[action as never]
      ).setOrigin(0.5, 0);
    }
  }

  subscribeToEvents() {
    const updateVisibility = () => {
      const action = this.store.get("action");
      const target = this.store.get("target");

      this.draw();
      this.setVisible(target !== "" && action !== "");
    };

    this.store.changed("action", updateVisibility);
    this.store.changed("target", updateVisibility);
  }
}
