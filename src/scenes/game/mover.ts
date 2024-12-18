import { GameObjects } from "phaser";
import { InputHandler } from "./input-handler";
import { WorldDecoration } from "./world-decoration";

export class Mover {
  static playerSpeed = 10; // pixels per 100ms - also affects the worldGroup

  worldPos = 0; // player oriented
  lowerWorldBound = -1e3; // px, exclusive
  upperWorldBound = 4e4; // px, exclusive

  constructor(
    private inputHandler: InputHandler,
    private worldDecoration: WorldDecoration
  ) {}

  moveWorld(offset: number) {
    this.worldPos -= offset;
    this.worldDecoration.decorationInfos.forEach((info) => {
      info.group.getChildren().forEach((_child) => {
        const child = _child as GameObjects.Image;
        child.setPosition(child.x + offset * info.speedMultiplier, child.y);
      });
    });
  }

  /**
   * direction: number - player oriented (opposite of world oriented)
   */
  canMove(direction: number): boolean {
    if (
      this.worldPos > this.lowerWorldBound &&
      this.worldPos < this.upperWorldBound
    ) {
      return true;
    } else if (
      (this.worldPos <= this.lowerWorldBound && direction === 1) ||
      (this.worldPos >= this.upperWorldBound && direction === -1)
    ) {
      return true;
    }

    return false;
  }

  update(_: number, delta: number) {
    if (this.inputHandler.movingLeft && this.canMove(-1)) {
      this.moveWorld((Mover.playerSpeed * delta) / 10);
    } else if (this.inputHandler.movingRight && this.canMove(1)) {
      this.moveWorld((-Mover.playerSpeed * delta) / 10);
    }
  }
}
