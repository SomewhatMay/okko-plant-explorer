import { GameObjects, Physics, Scene } from "phaser";
import { screenSize } from "../../main";
import { GrassContainer } from "./grass-container";

export type InteractableInfo = {
  imageKey: string;
  imageUrl: string;
  xCoordinate: number;
  scale: number;

  title: string;
  description: string;
  sourceUrl?: string;
};

export class Interactable {
  object: GameObjects.Image;

  constructor(
    private scene: Scene,
    private worldGroup: Physics.Arcade.StaticGroup,
    private info: InteractableInfo
  ) {
    this.object = this.scene.add
      .image(
        this.info.xCoordinate,
        screenSize.y - GrassContainer.grassSize.y,
        this.info.imageKey
      )
      .setOrigin(0, 1)
      .setScale(this.info.scale);
    this.worldGroup.add(this.object);

    console.log(this.info.imageUrl);
  }

  getX() {
    return this.object.x;
  }

  /**
   * Calculates the distance from the center
   * of the screen to the interactable
   */
  getDistance() {
    return this.getX() - screenSize.x / 2;
  }
}
