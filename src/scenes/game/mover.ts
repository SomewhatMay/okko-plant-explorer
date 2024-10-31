import { GameObjects, Physics } from "phaser";
import { Game as MainGame } from "./index";

export class Mover {
  static playerSpeed = 10; // pixels per 100ms

  worldPos = 0; // player oriented
  lowerWorldBound = -500; // px, exclusive
  upperWorldBound = 2000; // px, exclusive

  constructor(
    private scene: MainGame,
    private worldGroup: Physics.Arcade.StaticGroup
  ) {}

  moveWorld(offset: number) {
    this.worldPos -= offset;

    this.worldGroup.getChildren().forEach((_child) => {
      const child = _child as GameObjects.Image;
      child.setPosition(child.x + offset, child.y);
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
    if (this.scene.movingLeft && this.canMove(-1)) {
      this.moveWorld((Mover.playerSpeed * delta) / 10);
    } else if (this.scene.movingRight && this.canMove(1)) {
      this.moveWorld((-Mover.playerSpeed * delta) / 10);
    }
  }
}
