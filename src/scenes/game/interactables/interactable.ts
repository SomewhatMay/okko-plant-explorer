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
    this.object = this.scene.add
      .image(
        this.info.xCoordinate,
        screenSize.y - GrassContainer.grassSize.y,
        this.info.imageKey
      )
      .setOrigin(0, 1)
      .setScale(this.info.scale);
    this.worldDecoration.addToForegroundGroup(this.object);
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
