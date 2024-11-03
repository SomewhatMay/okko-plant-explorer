import { UIContainer } from "./ui-container";
import { screenSize } from "../../constants";
import { Game as MainGame } from "../game/index";
import { InteractableInfo } from "../game/interactables";
import { Store } from "../game/store";

export class Menu extends UIContainer {
  static readonly WIDTH = 225;

  private lineY: number;

  constructor(
    scene: MainGame,
    private store: Store
  ) {
    super(scene, screenSize.x / 2 - Menu.WIDTH / 2, 40);
    this.draw();
    this.setVisible(false);

    this.subscribeToEvents();
  }

  draw() {
    this.clear();
    this.drawRoundRect(0, 0, Menu.WIDTH, 230);
    this.drawText(Menu.WIDTH / 2, 10, "Item:", 19).setOrigin(0.5, 0);
    let discovered = 0;

    const target = this.store.get("target");
    if (target !== "") {
      const info = this.store.getInfo(
        target as string
      ) as unknown as InteractableInfo;
      discovered = this.store.getDiscovered(target);
      this.drawText(
        Menu.WIDTH / 2,
        32,
        discovered == 100 ? info.title : "?????????",
        28
      ).setOrigin(0.5, 0);
      this.drawText(
        Menu.WIDTH / 2,
        26 + 4 + 28 + 4,
        "Discovered: " + discovered + "%",
        18
      ).setOrigin(0.5, 0);
    }

    this.lineY = 26 + 4 + 24 + 4 + 24 + 8;
    this.drawLine(16, this.lineY, Menu.WIDTH - 16, this.lineY);

    this.drawAction("[E] Observe", 0);
    this.drawAction("[F] Touch", 1);
    this.drawAction("[Q] Smell", 2);
    this.drawAction("[R] Research " + (discovered === 100 ? "🔓" : "🔒"), 3);
  }

  subscribeToEvents() {
    const updateVisibility = () => {
      const action = this.store.get("action");
      const target = this.store.get("target");

      this.draw();
      this.setVisible(target !== "" && action === "");
    };

    this.store.changed("action", updateVisibility);
    this.store.changed("target", updateVisibility);
    this.store.changed("interactables", updateVisibility);
  }

  drawAction(title: string, n: number) {
    this.drawText(Menu.WIDTH / 2, this.lineY + 8 + n * 30, title, 22).setOrigin(
      0.5,
      0
    );
  }

  update() {
    // this.draw();
  }
}
