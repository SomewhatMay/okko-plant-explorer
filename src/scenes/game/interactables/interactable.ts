import { GameObjects, Scene } from "phaser";
import { screenSize } from "../../../constants";
import { GrassContainer } from "../world-decoration/grass-container";
import { WorldDecoration } from "../world-decoration";

export type InteractableInfo = {
  imageKey: string;
  imageUrl: string;
  xCoordinate: number;
  scale: number;

  title: string;
  sourceUrl?: string;
  observe: string;
  touch: string;
  smell: string;

  discovered: {
    observe: boolean;
    touch: boolean;
    smell: boolean;
  };
};

export class Interactable {
  object: GameObjects.Image;

  constructor(
    private scene: Scene,
    private worldDecoration: WorldDecoration,
    public info: InteractableInfo
  ) {
    for (let i = -1; i < 2; i++) {
      const newImage = this.scene.add
        .image(0, 0, this.info.imageKey)
        .setOrigin(0, 1)
        .setScale(this.info.scale);
      newImage.setPosition(
        this.info.xCoordinate + i * newImage.width * this.info.scale,
        screenSize.y - GrassContainer.grassSize.y
      );
      this.worldDecoration.addToForegroundGroup(newImage);

      if (i == 0) {
        this.object = newImage;
      }
    }
  }

  getX() {
    return this.object.x;
  }

  /**
   * Calculates the distance from the center
   * of the screen to the interactable
   * *negative range possible!*
   */
  getDistance() {
    return this.getX() - screenSize.x / 2;
  }
}
