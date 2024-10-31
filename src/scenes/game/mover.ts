import { GameObjects, Physics } from "phaser";
import { Game as MainGame } from "./index";

export class Mover {
  static playerSpeed = 10; // pixels per 100ms

  worldPos = 0;

  constructor(
    private scene: MainGame,
    private worldGroup: Physics.Arcade.StaticGroup
  ) {}

  moveWorld(offset: number) {
    this.worldPos += offset;

    this.worldGroup.getChildren().forEach((_child) => {
      const child = _child as GameObjects.Image;
      child.setPosition(child.x + offset, child.y);
    });
  }

  update(_: number, delta: number) {
    if (this.scene.movingLeft) {
      this.moveWorld((Mover.playerSpeed * delta) / 10);
    } else if (this.scene.movingRight) {
      this.moveWorld((-Mover.playerSpeed * delta) / 10);
    }
  }
}
