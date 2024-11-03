import { GameObjects, Scene } from "phaser";
import { screenSize } from "../../../constants";
import { GrassContainer } from "../world-decoration/grass-container";
import { WorldDecoration } from "../world-decoration";
import { getRandomFloat, getRandomInt } from "../../../util";

export type InteractableInfo = {
  imageKey: string;
  imageUrl: string;
  scale: number;
  interactionDistance: number;
  distanceVariance: [number, number];
  itemCountVariance: [number, number];

  title: string;
  sourceUrl?: string;
  observe: string;
  touch: string;
  smell: string;
  research: string;

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
    public info: InteractableInfo,
    xCoordinate: number
  ) {
    const count = getRandomInt(
      info.itemCountVariance[0],
      info.itemCountVariance[1] + 1
    );
    for (let i = 0; i < count; i++) {
      const intraInteractableDist = getRandomFloat(
        info.distanceVariance[0],
        info.distanceVariance[1]
      );
      const newImage = this.scene.add
        .image(0, 0, this.info.imageKey)
        .setOrigin(0, 1)
        .setScale(this.info.scale + (Math.random() - 0.5) * 0.125);
      newImage.flipX = Math.random() < 0.5;
      newImage.setPosition(
        xCoordinate +
          (i - (count - 1) / 2) *
            newImage.width *
            this.info.scale *
            intraInteractableDist,
        screenSize.y - GrassContainer.grassSize.y
      );
      this.worldDecoration.addToForegroundGroup(newImage);

      if (i === Math.round(count / 2)) {
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
