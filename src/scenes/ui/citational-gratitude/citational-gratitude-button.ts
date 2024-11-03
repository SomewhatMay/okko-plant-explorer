import { UIContainer } from "../ui-container";
import { Game as MainGame } from "../../game/index";
import { screenSize } from "../../../constants";
import { MainWindow } from "./main-window";

export class CitationalGratitudeButton extends UIContainer {
  pointerOver: boolean = false;

  constructor(
    scene: MainGame,
    private mainWindow: MainWindow
  ) {
    super(scene, screenSize.x - 48 - 16, screenSize.y - 48 - 16);

    const inputHandler = this.scene.add
      .image(this.offsetX, this.offsetY, "transparent")
      .setDisplaySize(48, 48)
      .setOrigin(0, 0)
      .setInteractive();

    inputHandler.on("pointerup", () => {
      if (!this.mainWindow.getVisible()) {
        this.mainWindow.setVisible(true);

        setTimeout(() => {
          scene.input.once("pointerup", () => {
            if (this.mainWindow.getVisible()) {
              this.mainWindow.setVisible(false);
            }
          });
        }, 100);
      }
    });

    inputHandler.on("pointerover", () => {
      this.pointerOver = true;
      this.draw();
    });

    inputHandler.on("pointerout", () => {
      this.pointerOver = false;
      this.draw();
    });

    // scene.input.addListener("pointerup", () => {
    //   if (this.mainWindow.getVisible()) {
    //     this.mainWindow.setVisible(false);
    //   }
    // });

    this.draw();
  }

  draw() {
    // draw the button
    this.clear();
    this.drawRoundRect(
      0,
      0,
      48,
      48,
      0xffffff,
      0x000000,
      12,
      3,
      this.pointerOver ? 1 : 0.5
    );
    this.drawText(24, 24, "i", 30).setOrigin(0.5, 0.5);
  }
}
