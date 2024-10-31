import { Scene } from "phaser";
import { UIContainer } from "./ui-container";
import { screenSize } from "../../constants";
import { onChanges } from "../../util";
import { Game as MainGame } from "../game/index";
import { InteractableInfo } from "../game/interactable";

export class Menu extends UIContainer {
  static readonly WIDTH = 200;

  private lineY: number;

  constructor(scene: Scene) {
    super(scene, screenSize.x / 2 - Menu.WIDTH / 2, 40);
    this.draw();
    this.setVisible(false);

    this.subscribeToEvents();
  }

  draw() {
    this.clear();
    this.drawRoundRect(0, 0, Menu.WIDTH, 195);
    this.drawText(Menu.WIDTH / 2, 10, "Item:").setOrigin(0.5, 0);

    const target = this.scene.registry.get("target");
    if (target !== "") {
      const info = (this.scene as MainGame).getInfo(
        target as string
      ) as unknown as InteractableInfo;
      const discovered = (this.scene as MainGame).getDiscovered(target);
      this.drawText(
        Menu.WIDTH / 2,
        26 + 4,
        discovered == 100 ? info.title : "?????????",
        24
      ).setOrigin(0.5, 0);
      this.drawText(
        Menu.WIDTH / 2,
        26 + 4 + 24 + 4,
        "Discovered: " + discovered + "%"
      ).setOrigin(0.5, 0);
    }

    this.lineY = 26 + 4 + 24 + 4 + 24 + 2;
    this.drawLine(16, this.lineY, Menu.WIDTH - 16, this.lineY);

    this.drawAction("[E] Observe", 0);
    this.drawAction("[F] Touch", 1);
    this.drawAction("[Q] Smell", 2);
  }

  subscribeToEvents() {
    const updateVisibility = () => {
      const action = this.scene.registry.get("action");
      const target = this.scene.registry.get("target");

      this.draw();
      this.setVisible(target !== "" && action === "");
    };

    onChanges(this.scene, "action", updateVisibility);
    onChanges(this.scene, "target", updateVisibility);
    onChanges(this.scene, "interactables", updateVisibility);
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
