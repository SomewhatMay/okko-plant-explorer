import { GameObjects, Physics } from "phaser";
import { InputHandler } from "./input-handler";

export class Mover {
  static playerSpeed = 10; // pixels per 100ms - also affects the worldGroup
  static mountainSpeed = 0.075; // affects the mountainGroup - multiplier for playerSpeed
  static treeSpeed = 0.125;

  worldPos = 0; // player oriented
  lowerWorldBound = -1e3; // px, exclusive
  upperWorldBound = 1e5; // px, exclusive

  constructor(
    private inputHandler: InputHandler,
    private worldGroup: Physics.Arcade.StaticGroup,
    private mountainGroup: Physics.Arcade.StaticGroup,
    private treeGroup: Physics.Arcade.StaticGroup
  ) {}

  moveWorld(offset: number) {
    this.worldPos -= offset;

    this.worldGroup.getChildren().forEach((_child) => {
      const child = _child as GameObjects.Image;
      child.setPosition(child.x + offset, child.y);
    });

    this.mountainGroup.getChildren().forEach((_child) => {
      const child = _child as GameObjects.Image;
      child.setPosition(child.x + offset * Mover.mountainSpeed, child.y);
    });

    this.treeGroup.getChildren().forEach((_child) => {
      const child = _child as GameObjects.Image;
      child.setPosition(child.x + offset * Mover.treeSpeed, child.y);
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
