import { UIContainer } from "./ui-container";
import { screenSize } from "../../constants";
import { Game as MainGame } from "../game/index";
import { Store } from "../game/store";

export class InfoDisplay extends UIContainer {
  static readonly WIDTH = 600;

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

    const target = this.scene.registry.get("target") as string;
    const action = this.scene.registry.get("action") as string;
    let desc = "";

    if (target !== "" && action !== "") {
      desc = (this.store.getInfo(target) as never)[action as never];
    }

    const lineY = 10 + 37 + 17;
    const textObj = new Phaser.GameObjects.Text(
      this.scene,
      InfoDisplay.WIDTH / 2 + this.offsetX,
      this.offsetY + lineY + 8,
      desc,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "20px",
        wordWrap: { width: InfoDisplay.WIDTH - 64 },
      }
    )
      .setOrigin(0.5, 0)
      .setColor("black");
    this.children.push(textObj);
    this.layer.add(textObj);

    this.drawRoundRect(0, 0, InfoDisplay.WIDTH, textObj.height + lineY + 24);
    this.drawText(InfoDisplay.WIDTH / 2, 10, "Examining...").setOrigin(0.5, 0);
    this.drawText(InfoDisplay.WIDTH / 2, 37, "[ESC] Go Back", 17).setOrigin(
      0.5,
      0
    );
    this.drawLine(24, lineY, InfoDisplay.WIDTH - 24, lineY);
    this.scene.add.existing(textObj);
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
