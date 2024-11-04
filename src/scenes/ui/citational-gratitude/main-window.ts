import { UIContainer } from "../ui-container";
import { Game as MainGame } from "../../game/index";
import { screenSize } from "../../../constants";
import { gratitude, imageSources } from "./gratitude";

export class MainWindow extends UIContainer {
  static readonly WIDTH = 600;
  static readonly HEIGHT = 605;

  constructor(scene: MainGame) {
    super(
      scene,
      screenSize.x / 2 - MainWindow.WIDTH / 2,
      screenSize.y / 2 - MainWindow.HEIGHT / 2
    );

    this.layer.setDepth(100);
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

    const gratitudeText = this.drawText(
      MainWindow.WIDTH / 2,
      64,
      gratitude,
      20,
      undefined,
      MainWindow.WIDTH - 96
    ).setOrigin(0.5, 0);

    const topGratitudeY = gratitudeText.y - this.offsetY + gratitudeText.height;
    this.drawText(
      55,
      topGratitudeY + 16,
      "Below are links to the sources of the images used in this game.",
      18,
      "gray"
    ).setOrigin(0, 0);
    this.drawLine(32, 48, MainWindow.WIDTH - 32, 48);

    this.drawText(
      55,
      topGratitudeY + 36,
      "Click on a source to learn more.",
      18,
      "gray"
    ).setOrigin(0, 0);
    this.drawLine(32, 48, MainWindow.WIDTH - 32, 48);

    let sourcesY = topGratitudeY + 36 + 16;
    Object.entries(imageSources).forEach(([key, value]) => {
      this.drawTextButton(
        55,
        sourcesY + 10,
        key,
        () => {
          window.open(value, "_blank");
        },
        undefined,
        undefined,
        18,
        "blue"
      ).setOrigin(0, 0);
      this.drawLine(32, 48, MainWindow.WIDTH - 32, 48);
      sourcesY += 24;
    });

    const statementText = this.drawText(
      55,
      sourcesY + 18,
      "This project is fully open-source. You can explore the code, research sources, artist statement, as well as learn about the author of this project on the GitHub:",
      18,
      undefined,
      MainWindow.WIDTH - 96
    ).setOrigin(0, 0);
    const githubLink = "https://github.com/SomewhatMay/okko-plant-explorer";
    this.drawTextButton(
      55,
      statementText.y + statementText.height - this.offsetY + 8,
      githubLink,
      () => {
        window.open(githubLink, "_blank");
      },
      undefined,
      undefined,
      18,
      "blue"
    ).setOrigin(0, 0);

    this.drawText(
      MainWindow.WIDTH / 2,
      MainWindow.HEIGHT - 18 - 20,
      "Click anywhere to dismiss",
      18,
      "gray"
    ).setOrigin(0.5, 0);
  }
}
